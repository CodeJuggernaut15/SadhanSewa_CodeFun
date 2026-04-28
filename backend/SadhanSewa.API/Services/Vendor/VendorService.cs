using Microsoft.EntityFrameworkCore;
using SadhanSewa.API.Data;
using SadhanSewa.API.DTOs.PurchaseInvoice;
using SadhanSewa.API.DTOs.Vendor;
using SadhanSewa.API.Models;

namespace SadhanSewa.API.Services.Vendor;

public class VendorService(ApplicationDbContext db, ILogger<VendorService> logger) : IVendorService
{
    private readonly ApplicationDbContext _db = db;
    private readonly ILogger<VendorService> _logger = logger;

    public async Task<List<VendorDto>> GetAllAsync()
    {
        return await _db.Vendors
            .AsNoTracking()
            .OrderBy(v => v.Name)
            .Select(v => MapToDto(v))
            .ToListAsync();
    }

    public async Task<VendorDto?> GetByIdAsync(int id)
    {
        var vendor = await _db.Vendors.AsNoTracking().FirstOrDefaultAsync(v => v.Id == id);
        return vendor is null ? null : MapToDto(vendor);
    }

    // used by the purchase invoice dropdown
    public async Task<List<VendorDropdownDto>> GetDropdownAsync()
    {
        return await _db.Vendors
            .AsNoTracking()
            .Where(v => v.Status == "Active")
            .OrderBy(v => v.Name)
            .Select(v => new VendorDropdownDto { Id = v.Id, Name = v.Name })
            .ToListAsync();
    }

    public async Task<int> CreateAsync(CreateVendorDto dto)
    {
        var vendor = new Models.Vendor
        {
            Name = dto.Name,
            Location = dto.Location,
            Contact = dto.Contact,
            Email = dto.Email,
            Category = dto.Category,
            Status = "Active",
            CreatedAt = DateTime.UtcNow,
            UpdatedAt = DateTime.UtcNow
        };

        _db.Vendors.Add(vendor);
        await _db.SaveChangesAsync();
        _logger.LogInformation("Vendor {Name} created with id {Id}.", vendor.Name, vendor.Id);
        return vendor.Id;
    }

    public async Task<VendorDto?> UpdateAsync(int id, UpdateVendorDto dto)
    {
        var vendor = await _db.Vendors.FirstOrDefaultAsync(v => v.Id == id);
        if (vendor is null) return null;

        // only update fields that were actually sent
        if (dto.Name is not null) vendor.Name = dto.Name;
        if (dto.Location is not null) vendor.Location = dto.Location;
        if (dto.Contact is not null) vendor.Contact = dto.Contact;
        if (dto.Email is not null) vendor.Email = dto.Email;
        if (dto.Category is not null) vendor.Category = dto.Category;
        if (dto.Status is not null) vendor.Status = dto.Status;

        vendor.UpdatedAt = DateTime.UtcNow;
        await _db.SaveChangesAsync();
        return MapToDto(vendor);
    }

    // soft-delete only, vendor may have purchase invoices
    public async Task<bool> DeactivateAsync(int id)
    {
        var vendor = await _db.Vendors.FirstOrDefaultAsync(v => v.Id == id);
        if (vendor is null) return false;

        vendor.Status = "Inactive";
        vendor.UpdatedAt = DateTime.UtcNow;
        await _db.SaveChangesAsync();
        _logger.LogInformation("Vendor {Id} deactivated.", id);
        return true;
    }

    private static VendorDto MapToDto(Models.Vendor v) => new()
    {
        Id = v.Id,
        Name = v.Name,
        Location = v.Location,
        Contact = v.Contact,
        Email = v.Email,
        Category = v.Category,
        Status = v.Status,
        CreatedAt = v.CreatedAt
    };
}
