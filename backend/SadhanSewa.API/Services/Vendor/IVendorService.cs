using SadhanSewa.API.DTOs.Vendor;
using SadhanSewa.API.DTOs.PurchaseInvoice;

namespace SadhanSewa.API.Services.Vendor;

/// <summary>
/// CRUD operations for vendors.
/// </summary>
public interface IVendorService
{
    Task<List<VendorDto>> GetAllAsync();
    Task<VendorDto?> GetByIdAsync(int id);
    Task<List<VendorDropdownDto>> GetDropdownAsync();
    Task<VendorDto> CreateAsync(CreateVendorDto dto);
    Task<VendorDto?> UpdateAsync(int id, UpdateVendorDto dto);
    Task<bool> DeleteAsync(int id);
}
