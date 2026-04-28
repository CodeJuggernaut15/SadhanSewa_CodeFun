using SadhanSewa.API.DTOs.PurchaseInvoice;
using SadhanSewa.API.DTOs.Vendor;

namespace SadhanSewa.API.Services.Vendor;

public interface IVendorService
{
    Task<List<VendorDto>> GetAllAsync();
    Task<VendorDto?> GetByIdAsync(int id);
    Task<List<VendorDropdownDto>> GetDropdownAsync();
    Task<int> CreateAsync(CreateVendorDto dto);
    Task<VendorDto?> UpdateAsync(int id, UpdateVendorDto dto);
    Task<bool> DeactivateAsync(int id);
}
