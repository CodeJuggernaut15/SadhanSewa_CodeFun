using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SadhanSewa.API.Data;
using SadhanSewa.API.DTOs;
using SadhanSewa.API.DTOs.Sales;
using SadhanSewa.API.Models;
using SadhanSewa.API.Services.Email;

namespace SadhanSewa.API.Controllers;

/// <summary>
/// Create sales invoices, apply loyalty discounts, and send invoice emails to customers.
/// </summary>
[ApiController]
[Authorize(Roles = "Admin,Staff")]
[Route("api/sales-invoices")]
[Tags("Sales")]
public class SalesInvoicesController(ApplicationDbContext db, IEmailService emailService) : ControllerBase
{
    [HttpGet]
    [ProducesResponseType(typeof(ApiResponse<List<SalesInvoiceDto>>), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status403Forbidden)]
    public async Task<ActionResult<ApiResponse<List<SalesInvoiceDto>>>> GetAllAsync()
    {
        var invoices = await db.SalesInvoices
            .AsNoTracking()
            .Include(i => i.Customer)
            .Include(i => i.Items)
                .ThenInclude(i => i.Part)
            .OrderByDescending(i => i.CreatedAt)
            .Take(100)
            .ToListAsync();

        var data = invoices.Select(Map).ToList();

        return Ok(ApiResponse<List<SalesInvoiceDto>>.Ok(data, "Sales invoices retrieved."));
    }

    [HttpGet("{id:int}")]
    [ProducesResponseType(typeof(ApiResponse<SalesInvoiceDto>), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(ApiResponse<object>), StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status403Forbidden)]
    public async Task<ActionResult<ApiResponse<SalesInvoiceDto>>> GetByIdAsync(int id)
    {
        var invoice = await db.SalesInvoices
            .AsNoTracking()
            .Include(i => i.Customer)
            .Include(i => i.Items)
                .ThenInclude(i => i.Part)
            .FirstOrDefaultAsync(i => i.Id == id);

        if (invoice is null)
            return NotFound(ApiResponse<SalesInvoiceDto>.Fail("Sales invoice not found."));

        return Ok(ApiResponse<SalesInvoiceDto>.Ok(Map(invoice), "Sales invoice retrieved."));
    }

    /// <summary>
    /// Create a new sales invoice. Auto-applies 10% discount if subtotal exceeds Rs. 5000.
    /// If customer has an email and emailSent is true, an invoice email is sent automatically.
    /// </summary>
    [HttpPost]
    [ProducesResponseType(typeof(ApiResponse<SalesInvoiceDto>), StatusCodes.Status201Created)]
    [ProducesResponseType(typeof(ApiResponse<object>), StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status403Forbidden)]
    public async Task<ActionResult<ApiResponse<SalesInvoiceDto>>> CreateAsync([FromBody] CreateSalesInvoiceDto dto)
    {
        if (!ModelState.IsValid)
            return BadRequest(ApiResponse<SalesInvoiceDto>.Fail("Validation failed.", GetModelErrors()));

        var createdById = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
        var partIds = dto.Items.Select(i => i.PartId).Distinct().ToList();
        var parts = await db.Parts.Where(p => partIds.Contains(p.Id)).ToDictionaryAsync(p => p.Id);

        foreach (var item in dto.Items)
        {
            if (!parts.TryGetValue(item.PartId, out var part))
                return BadRequest(ApiResponse<SalesInvoiceDto>.Fail($"Part {item.PartId} was not found."));
            if (part.Stock < item.Quantity)
                return BadRequest(ApiResponse<SalesInvoiceDto>.Fail($"{part.Name} has only {part.Stock} units in stock."));
        }

        if (dto.CustomerId is not null && !await db.Users.AnyAsync(u => u.Id == dto.CustomerId))
            return BadRequest(ApiResponse<SalesInvoiceDto>.Fail("Customer not found."));

        var subtotal = dto.Items.Sum(i => parts[i.PartId].Price * i.Quantity);
        var discountPct = subtotal > 5000 ? 10m : 0m;
        var discountAmount = subtotal * discountPct / 100m;
        var now = DateTime.UtcNow;

        var invoice = new SalesInvoice
        {
            InvoiceNumber = $"SI-{now:yyyyMMddHHmmss}",
            CustomerId = dto.CustomerId,
            CreatedById = createdById,
            Subtotal = subtotal,
            DiscountPct = discountPct,
            DiscountAmount = discountAmount,
            TotalAmount = subtotal - discountAmount,
            PaymentMethod = dto.PaymentMethod.Trim(),
            PaymentStatus = dto.PaymentStatus.Trim(),
            EmailSent = dto.EmailSent,
            CreatedAt = now
        };

        foreach (var item in dto.Items)
        {
            var part = parts[item.PartId];
            part.Stock -= item.Quantity;
            part.UpdatedAt = now;
            invoice.Items.Add(new SalesInvoiceItem
            {
                PartId = item.PartId,
                Quantity = item.Quantity,
                UnitPrice = part.Price
            });
        }

        db.SalesInvoices.Add(invoice);
        await db.SaveChangesAsync();

        var saved = await db.SalesInvoices
            .AsNoTracking()
            .Include(i => i.Customer)
            .Include(i => i.Items)
                .ThenInclude(i => i.Part)
            .FirstAsync(i => i.Id == invoice.Id);

        // send invoice email if customer has an email and emailSent flag was requested
        if (dto.EmailSent && saved.Customer?.Email is not null)
        {
            var sent = await emailService.SendInvoiceEmailAsync(
                Map(saved),
                saved.Customer.Email,
                saved.Customer.FullName);

            // update flag only if email actually went through
            if (sent)
            {
                var tracked = await db.SalesInvoices.FindAsync(invoice.Id);
                tracked!.EmailSent = true;
                await db.SaveChangesAsync();
            }
        }

        // reload to get the updated EmailSent value
        var final = await db.SalesInvoices
            .AsNoTracking()
            .Include(i => i.Customer)
            .Include(i => i.Items)
                .ThenInclude(i => i.Part)
            .FirstAsync(i => i.Id == invoice.Id);

        return StatusCode(StatusCodes.Status201Created,
            ApiResponse<SalesInvoiceDto>.Ok(Map(final), "Sales invoice created."));
    }

    private static SalesInvoiceDto Map(SalesInvoice invoice)
    {
        return new SalesInvoiceDto
        {
            Id = invoice.Id,
            InvoiceNumber = invoice.InvoiceNumber,
            CustomerId = invoice.CustomerId,
            CustomerName = invoice.Customer?.FullName ?? "Walk-in",
            Subtotal = invoice.Subtotal,
            DiscountPct = invoice.DiscountPct,
            DiscountAmount = invoice.DiscountAmount,
            TotalAmount = invoice.TotalAmount,
            PaymentMethod = invoice.PaymentMethod,
            PaymentStatus = invoice.PaymentStatus,
            EmailSent = invoice.EmailSent,
            CreatedAt = invoice.CreatedAt,
            Items = invoice.Items.Select(i => new SalesInvoiceItemDto
            {
                PartId = i.PartId,
                PartName = i.Part.Name,
                SKU = i.Part.SKU,
                Quantity = i.Quantity,
                UnitPrice = i.UnitPrice,
                LineTotal = i.Quantity * i.UnitPrice
            }).ToList()
        };
    }

    private Dictionary<string, string[]> GetModelErrors()
    {
        return ModelState
            .Where(x => x.Value?.Errors.Count > 0)
            .ToDictionary(
                kvp => kvp.Key,
                kvp => kvp.Value!.Errors.Select(e => e.ErrorMessage).ToArray());
    }
}
