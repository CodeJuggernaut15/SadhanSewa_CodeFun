using Microsoft.EntityFrameworkCore;
using SadhanSewa.API.Data;
using SadhanSewa.API.DTOs.PurchaseInvoice;
using SadhanSewa.API.Models;

namespace SadhanSewa.API.Services.PurchaseInvoice;

/// <summary>
/// Provides purchase invoice business operations.
/// </summary>
public class PurchaseInvoiceService(ApplicationDbContext db, ILogger<PurchaseInvoiceService> logger) : IPurchaseInvoiceService
{
    private const string SessionPrefix = "PRQ-";
    private const string ActiveVendorStatus = "Active";
    private readonly ApplicationDbContext _db = db;
    private readonly ILogger<PurchaseInvoiceService> _logger = logger;

    /// <summary>
    /// Returns all purchase invoices sorted by newest first.
    /// </summary>
    public async Task<List<PurchaseInvoiceSummaryDto>> GetAllAsync()
    {
        return await _db.PurchaseInvoices
            .AsNoTracking()
            .OrderByDescending(p => p.CreatedAt)
            .Select(p => new PurchaseInvoiceSummaryDto
            {
                Id = p.Id,
                SessionCode = p.SessionCode,
                VendorName = p.Vendor.Name,
                ExpectedIntakeDate = p.ExpectedIntakeDate,
                Status = p.Status.ToString(),
                TotalAmount = p.TotalAmount,
                LineItemCount = p.Items.Count,
                CreatedAt = p.CreatedAt
            })
            .ToListAsync();
    }

    /// <summary>
    /// Returns a purchase invoice details payload.
    /// </summary>
    public async Task<PurchaseInvoiceDetailDto?> GetByIdAsync(int id)
    {
        var invoice = await _db.PurchaseInvoices
            .AsNoTracking()
            .Include(p => p.Vendor)
            .Include(p => p.Items)
            .ThenInclude(i => i.Part)
            .FirstOrDefaultAsync(p => p.Id == id);

        return invoice is null ? null : MapDetail(invoice);
    }

    /// <summary>
    /// Returns audit metrics for a purchase invoice.
    /// </summary>
    public async Task<AuditSummaryDto?> GetAuditSummaryAsync(int invoiceId)
    {
        var invoice = await _db.PurchaseInvoices
            .AsNoTracking()
            .Include(p => p.Items)
            .FirstOrDefaultAsync(p => p.Id == invoiceId);

        if (invoice is null) return null;
        var netTotal = invoice.Items.Sum(i => i.LineTotal);
        return new AuditSummaryDto
        {
            NetManifestTotal = netTotal,
            AssetBulk = netTotal,
            IntakeScale = $"+{invoice.Items.Count} SKUs",
            CurrentFlow = $"{invoice.Status.ToString().ToUpperInvariant()} SESSION"
        };
    }

    /// <summary>
    /// Returns active vendors for dropdown consumption.
    /// </summary>
    public async Task<List<VendorDropdownDto>> GetVendorDropdownAsync()
    {
        return await _db.Vendors
            .AsNoTracking()
            .Where(v => v.Status == ActiveVendorStatus)
            .OrderBy(v => v.Name)
            .Select(v => new VendorDropdownDto { Id = v.Id, Name = v.Name })
            .ToListAsync();
    }

    /// <summary>
    /// Creates a purchase invoice with initial line items.
    /// </summary>
    public async Task<int> CreateAsync(CreatePurchaseInvoiceDto dto, int createdByUserId)
    {
        await EnsureVendorExistsAsync(dto.VendorId);
        var invoice = new Models.PurchaseInvoice
        {
            VendorId = dto.VendorId,
            CreatedById = createdByUserId,
            SessionCode = $"{SessionPrefix}{Random.Shared.Next(1000, 10000)}",
            ExpectedIntakeDate = dto.ExpectedIntakeDate,
            Status = PurchaseInvoiceStatus.Draft,
            CreatedAt = DateTime.UtcNow,
            Items = dto.LineItems.Select(MapCreateLineItem).ToList()
        };
        invoice.TotalAmount = invoice.Items.Sum(i => i.LineTotal);
        _db.PurchaseInvoices.Add(invoice);
        await _db.SaveChangesAsync();
        return invoice.Id;
    }

    /// <summary>
    /// Adds one line item and recalculates invoice total.
    /// </summary>
    public async Task<LineItemDto> AddLineItemAsync(int invoiceId, CreateLineItemDto dto)
    {
        var invoice = await _db.PurchaseInvoices.Include(i => i.Items).FirstOrDefaultAsync(i => i.Id == invoiceId)
            ?? throw new KeyNotFoundException("Purchase invoice not found.");
        if (invoice.Status == PurchaseInvoiceStatus.Finalized)
            throw new InvalidOperationException("Cannot add items to a finalized invoice.");
        var item = MapCreateLineItem(dto);
        item.PurchaseInvoiceId = invoiceId;
        invoice.Items.Add(item);
        invoice.TotalAmount = invoice.Items.Sum(i => i.LineTotal);
        await _db.SaveChangesAsync();
        return MapLineItem(item);
    }

    /// <summary>
    /// Removes one line item and recalculates invoice total.
    /// </summary>
    public async Task<bool> RemoveLineItemAsync(int invoiceId, int lineItemId)
    {
        var invoice = await _db.PurchaseInvoices.Include(i => i.Items).FirstOrDefaultAsync(i => i.Id == invoiceId)
            ?? throw new KeyNotFoundException("Purchase invoice not found.");
        if (invoice.Status == PurchaseInvoiceStatus.Finalized)
            throw new InvalidOperationException("Cannot remove items from a finalized invoice.");
        var item = invoice.Items.FirstOrDefault(i => i.Id == lineItemId)
            ?? throw new KeyNotFoundException("Line item not found.");
        invoice.Items.Remove(item);
        _db.PurchaseInvoiceItems.Remove(item);
        invoice.TotalAmount = invoice.Items.Sum(i => i.LineTotal);
        await _db.SaveChangesAsync();
        return true;
    }

    /// <summary>
    /// Updates low-stock flags by comparing requested volume against stock.
    /// </summary>
    public async Task<int> SyncLowStockAlertAsync(int invoiceId)
    {
        var invoice = await _db.PurchaseInvoices
            .Include(p => p.Items)
            .ThenInclude(i => i.Part)
            .FirstOrDefaultAsync(p => p.Id == invoiceId)
            ?? throw new KeyNotFoundException("Purchase invoice not found.");

        foreach (var item in invoice.Items)
        {
            item.IsLowStockAlert = item.Part.Stock < item.Quantity;
        }

        await _db.SaveChangesAsync();
        return invoice.Items.Count(i => i.IsLowStockAlert);
    }

    /// <summary>
    /// Finalizes a draft purchase invoice.
    /// </summary>
    public async Task<bool> FinalizeAsync(int invoiceId)
    {
        var invoice = await _db.PurchaseInvoices.FirstOrDefaultAsync(p => p.Id == invoiceId)
            ?? throw new KeyNotFoundException("Purchase invoice not found.");
        if (invoice.Status == PurchaseInvoiceStatus.Finalized)
            throw new InvalidOperationException("Invoice is already finalized.");
        invoice.Status = PurchaseInvoiceStatus.Finalized;
        invoice.UpdatedAt = DateTime.UtcNow;
        await _db.SaveChangesAsync();
        _logger.LogInformation("Purchase invoice {InvoiceId} finalized.", invoiceId);
        return true;
    }

    private async Task EnsureVendorExistsAsync(int vendorId)
    {
        if (!await _db.Vendors.AsNoTracking().AnyAsync(v => v.Id == vendorId))
            throw new KeyNotFoundException("Vendor not found.");
    }

    private static PurchaseInvoiceDetailDto MapDetail(Models.PurchaseInvoice invoice)
    {
        return new PurchaseInvoiceDetailDto
        {
            Id = invoice.Id,
            SessionCode = invoice.SessionCode,
            VendorName = invoice.Vendor.Name,
            ExpectedIntakeDate = invoice.ExpectedIntakeDate,
            Status = invoice.Status.ToString(),
            TotalAmount = invoice.TotalAmount,
            LineItemCount = invoice.Items.Count,
            CreatedAt = invoice.CreatedAt,
            LineItems = invoice.Items.Select(MapLineItem).ToList()
        };
    }

    private static PurchaseInvoiceItem MapCreateLineItem(CreateLineItemDto dto)
    {
        return new PurchaseInvoiceItem
        {
            PartId = dto.PartId,
            Quantity = dto.Volume,
            UnitPrice = dto.UnitCost,
            VendorName = dto.VendorName
        };
    }

    private static LineItemDto MapLineItem(PurchaseInvoiceItem item)
    {
        return new LineItemDto
        {
            Id = item.Id,
            ComponentName = item.Part?.Name ?? string.Empty,
            VendorName = item.VendorName,
            Volume = item.Quantity,
            UnitCost = item.UnitPrice,
            TotalCost = item.LineTotal,
            IsLowStockAlert = item.IsLowStockAlert
        };
    }
}
