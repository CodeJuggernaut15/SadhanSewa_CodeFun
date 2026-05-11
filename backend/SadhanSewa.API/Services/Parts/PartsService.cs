using Microsoft.EntityFrameworkCore;
using SadhanSewa.API.Data;
using SadhanSewa.API.DTOs.Part;
using SadhanSewa.API.Models;

namespace SadhanSewa.API.Services.Parts;

/// <summary>
/// Implements part persistence and validation rules.
/// </summary>
public class PartsService(ApplicationDbContext db, ILogger<PartsService> logger) : IPartsService
{
    private readonly ApplicationDbContext _db = db;
    private readonly ILogger<PartsService> _logger = logger;

    /// <inheritdoc />
    public async Task<List<PartDto>> GetAllAsync()
    {
        var list = await _db.Parts
            .AsNoTracking()
            .Include(p => p.Vendor)
            .OrderBy(p => p.Name)
            .ToListAsync();
        return list.Select(MapToDto).ToList();
    }

    /// <inheritdoc />
    public async Task<PartDto?> GetByIdAsync(int id)
    {
        var part = await _db.Parts
            .AsNoTracking()
            .Include(p => p.Vendor)
            .FirstOrDefaultAsync(p => p.Id == id);
        return part is null ? null : MapToDto(part);
    }

    /// <inheritdoc />
    public async Task<PartDto> CreateAsync(CreatePartDto dto)
    {
        await EnsureVendorExistsIfSetAsync(dto.VendorId);
        if (await _db.Parts.AnyAsync(p => p.SKU == dto.SKU))
            throw new InvalidOperationException("A part with this SKU already exists.");

        var now = DateTime.UtcNow;
        var entity = new Part
        {
            Name = dto.Name.Trim(),
            SKU = dto.SKU.Trim(),
            Category = string.IsNullOrWhiteSpace(dto.Category) ? null : dto.Category.Trim(),
            Price = dto.Price,
            Stock = dto.Stock,
            LowStockThreshold = dto.LowStockThreshold,
            VendorId = dto.VendorId,
            CreatedAt = now,
            UpdatedAt = now
        };

        _db.Parts.Add(entity);
        await _db.SaveChangesAsync();

        _logger.LogInformation("Part created: {Sku} (Id={Id})", entity.SKU, entity.Id);

        return (await GetByIdAsync(entity.Id))!;
    }

    /// <inheritdoc />
    public async Task<PartDto?> UpdateAsync(int id, UpdatePartDto dto)
    {
        var entity = await _db.Parts.FirstOrDefaultAsync(p => p.Id == id);
        if (entity is null) return null;

        await EnsureVendorExistsIfSetAsync(dto.VendorId);
        if (await _db.Parts.AnyAsync(p => p.SKU == dto.SKU && p.Id != id))
            throw new InvalidOperationException("A part with this SKU already exists.");

        entity.Name = dto.Name.Trim();
        entity.SKU = dto.SKU.Trim();
        entity.Category = string.IsNullOrWhiteSpace(dto.Category) ? null : dto.Category.Trim();
        entity.Price = dto.Price;
        entity.Stock = dto.Stock;
        entity.LowStockThreshold = dto.LowStockThreshold;
        entity.VendorId = dto.VendorId;
        entity.UpdatedAt = DateTime.UtcNow;

        await _db.SaveChangesAsync();
        _logger.LogInformation("Part updated: Id={Id}", id);

        return await GetByIdAsync(id);
    }

    /// <inheritdoc />
    public async Task<bool> DeleteAsync(int id)
    {
        var entity = await _db.Parts.FirstOrDefaultAsync(p => p.Id == id);
        if (entity is null) return false;

        var hasPurchaseLines = await _db.PurchaseInvoiceItems.AnyAsync(i => i.PartId == id);
        var hasSalesLines = await _db.SalesInvoiceItems.AnyAsync(i => i.PartId == id);
        if (hasPurchaseLines || hasSalesLines)
            throw new InvalidOperationException("Cannot delete a part that is referenced on purchase or sales invoices.");

        _db.Parts.Remove(entity);
        await _db.SaveChangesAsync();
        _logger.LogInformation("Part deleted: Id={Id}", id);
        return true;
    }

    private async Task EnsureVendorExistsIfSetAsync(int? vendorId)
    {
        if (vendorId is null) return;
        if (!await _db.Vendors.AsNoTracking().AnyAsync(v => v.Id == vendorId.Value))
            throw new InvalidOperationException("Vendor not found.");
    }

    private static PartDto MapToDto(Part p)
    {
        return new PartDto
        {
            Id = p.Id,
            Name = p.Name,
            SKU = p.SKU,
            Category = p.Category,
            Price = p.Price,
            Stock = p.Stock,
            LowStockThreshold = p.LowStockThreshold,
            VendorId = p.VendorId,
            VendorName = p.Vendor?.Name,
            CreatedAt = p.CreatedAt,
            UpdatedAt = p.UpdatedAt
        };
    }
}
