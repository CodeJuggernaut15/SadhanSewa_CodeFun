using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SadhanSewa.API.DTOs;
using SadhanSewa.API.DTOs.PurchaseInvoice;
using SadhanSewa.API.DTOs.Vendor;
using SadhanSewa.API.Services.Vendor;

namespace SadhanSewa.API.Controllers;

[ApiController]
[Route("api/vendors")]
public class VendorsController(IVendorService vendorService) : ControllerBase
{
    // GET /api/vendors — admin sees all vendors
    [Authorize(Roles = "Admin")]
    [HttpGet]
    public async Task<ActionResult<ApiResponse<List<VendorDto>>>> GetAllAsync()
    {
        var data = await vendorService.GetAllAsync();
        return Ok(ApiResponse<List<VendorDto>>.Ok(data, "Vendors retrieved."));
    }

    // GET /api/vendors/{id}
    [Authorize(Roles = "Admin")]
    [HttpGet("{id:int}")]
    public async Task<ActionResult<ApiResponse<VendorDto>>> GetByIdAsync(int id)
    {
        var data = await vendorService.GetByIdAsync(id);
        if (data is null) return NotFound(ApiResponse<VendorDto>.Fail("Vendor not found."));
        return Ok(ApiResponse<VendorDto>.Ok(data, "Vendor retrieved."));
    }

    // GET /api/vendors/dropdown — for staff when creating purchase invoices
    [Authorize(Roles = "Admin,Staff")]
    [HttpGet("dropdown")]
    public async Task<ActionResult<ApiResponse<List<VendorDropdownDto>>>> GetDropdownAsync()
    {
        var data = await vendorService.GetDropdownAsync();
        return Ok(ApiResponse<List<VendorDropdownDto>>.Ok(data, "Vendors retrieved."));
    }

    // POST /api/vendors
    [Authorize(Roles = "Admin")]
    [HttpPost]
    public async Task<ActionResult<ApiResponse<int>>> CreateAsync([FromBody] CreateVendorDto dto)
    {
        var id = await vendorService.CreateAsync(dto);
        return CreatedAtAction(nameof(GetByIdAsync), new { id }, ApiResponse<int>.Ok(id, "Vendor created."));
    }

    // PUT /api/vendors/{id}
    [Authorize(Roles = "Admin")]
    [HttpPut("{id:int}")]
    public async Task<ActionResult<ApiResponse<VendorDto>>> UpdateAsync(int id, [FromBody] UpdateVendorDto dto)
    {
        var data = await vendorService.UpdateAsync(id, dto);
        if (data is null) return NotFound(ApiResponse<VendorDto>.Fail("Vendor not found."));
        return Ok(ApiResponse<VendorDto>.Ok(data, "Vendor updated."));
    }

    // DELETE /api/vendors/{id} — sets status to Inactive, not a real delete
    [Authorize(Roles = "Admin")]
    [HttpDelete("{id:int}")]
    public async Task<ActionResult<ApiResponse<string>>> DeactivateAsync(int id)
    {
        var success = await vendorService.DeactivateAsync(id);
        if (!success) return NotFound(ApiResponse<string>.Fail("Vendor not found."));
        return Ok(ApiResponse<string>.Ok("Deactivated", "Vendor deactivated."));
    }
}
