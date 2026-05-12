using Microsoft.EntityFrameworkCore;
using SadhanSewa.API.Data;
using SadhanSewa.API.DTOs.PurchaseInvoice;
using SadhanSewa.API.DTOs.Vendor;
using SadhanSewa.API.Models;

namespace SadhanSewa.API.Services.Vendor;

/// <summary>
/// Handles vendor persistence and business rules.
/// </summary>
public class VendorService(ApplicationDbContext db, ILogger<VendorService> logger) : IVendorService
{
    private readonly ApplicationDbContext _db = db;
    private readonly ILogger<VendorService> _logger = logger;

    /// <inheritdoc />
    public async Task<List<VendorDto>> GetAllAsync()
    {
        var list = await _db.Vendors
            .AsNoTracking()
            .OrderBy(v => v.Name)
            .ToListAsync();
        return list.Select(MapToDto).ToList();
    }

    /// <inheritdoc />
    public async Task<VendorDto?> GetByIdAsync(int id)
    {
        var vendor = await _db.Vendors
            .AsNoTracking()
            .FirstOrDefaultAsync(v => v.Id == id);
        return vendor is null ? null : MapToDto(vendor);
    }

    /// <inheritdoc />
    public async Task<List<VendorDropdownDto>> GetDropdownAsync()
    {
        // only active vendors go in dropdown
        return await _db.Vendors
            .AsNoTracking()
            .Where(v => v.Status == "Active")
            .OrderBy(v => v.Name)
            .Select(v => new VendorDropdownDto { Id = v.Id, Name = v.Name })
            .ToListAsync();
    }

    /// <inheritdoc />
    public async Task<VendorDto> CreateAsync(CreateVendorDto dto)
    {
        // vendor names must be unique
        if (await _db.Vendors.AnyAsync(v => v.Name == dto.Name.Trim()))
            throw new InvalidOperationException("A vendor with this name already exists.");

        var now = DateTime.UtcNow;
        var entity = new SadhanSewa.API.Models.Vendor
        {
            Name = dto.Name.Trim(),
            Location = string.IsNullOrWhiteSpace(dto.Location) ? null : dto.Location.Trim(),
            Contact = string.IsNullOrWhiteSpace(dto.Contact) ? null : dto.Contact.Trim(),
            Email = string.IsNullOrWhiteSpace(dto.Email) ? null : dto.Email.Trim(),
            Category = string.IsNullOrWhiteSpace(dto.Category) ? null : dto.Category.Trim(),
            Status = dto.Status,
            CreatedAt = now,
            UpdatedAt = now
        };

        _db.Vendors.Add(entity);
        await _db.SaveChangesAsync();
        _logger.LogInformation("Vendor created: {Name} (Id={Id})", entity.Name, entity.Id);

        return (await GetByIdAsync(entity.Id))!;
    }

    /// <inheritdoc />
    public async Task<VendorDto?> UpdateAsync(int id, UpdateVendorDto dto)
    {
        var entity = await _db.Vendors.FirstOrDefaultAsync(v => v.Id == id);
        if (entity is null) return null;

        // check name uniqueness only if name changed
        if (entity.Name != dto.Name.Trim() &&
            await _db.Vendors.AnyAsync(v => v.Name == dto.Name.Trim() && v.Id != id))
            throw new InvalidOperationException("A vendor with this name already exists.");

        entity.Name = dto.Name.Trim();
        entity.Location = string.IsNullOrWhiteSpace(dto.Location) ? null : dto.Location.Trim();
        entity.Contact = string.IsNullOrWhiteSpace(dto.Contact) ? null : dto.Contact.Trim();
        entity.Email = string.IsNullOrWhiteSpace(dto.Email) ? null : dto.Email.Trim();
        entity.Category = string.IsNullOrWhiteSpace(dto.Category) ? null : dto.Category.Trim();
        entity.Status = dto.Status;
        entity.UpdatedAt = DateTime.UtcNow;

        await _db.SaveChangesAsync();
        _logger.LogInformation("Vendor updated: Id={Id}", id);

        return await GetByIdAsync(id);
    }

    /// <inheritdoc />
    public async Task<bool> DeleteAsync(int id)
    {
        var entity = await _db.Vendors.FirstOrDefaultAsync(v => v.Id == id);
        if (entity is null) return false;

        // cant delete if vendor has purchase invoices or parts linked
        var hasParts = await _db.Parts.AnyAsync(p => p.VendorId == id);
        var hasInvoices = await _db.PurchaseInvoices.AnyAsync(i => i.VendorId == id);
        if (hasParts || hasInvoices)
            throw new InvalidOperationException("Cannot delete a vendor that has parts or purchase invoices linked to it.");

        _db.Vendors.Remove(entity);
        await _db.SaveChangesAsync();
        _logger.LogInformation("Vendor deleted: Id={Id}", id);
        return true;
    }

    private static VendorDto MapToDto(SadhanSewa.API.Models.Vendor v)
    {
        return new VendorDto
        {
            Id = v.Id,
            Name = v.Name,
            Location = v.Location,
            Contact = v.Contact,
            Email = v.Email,
            Category = v.Category,
            Status = v.Status,
            CreatedAt = v.CreatedAt,
            UpdatedAt = v.UpdatedAt
        };
    }
}
