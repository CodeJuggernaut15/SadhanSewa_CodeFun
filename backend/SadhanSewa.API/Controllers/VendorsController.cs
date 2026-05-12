using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SadhanSewa.API.DTOs;
using SadhanSewa.API.DTOs.PurchaseInvoice;
using SadhanSewa.API.DTOs.Vendor;
using SadhanSewa.API.Services.Vendor;

namespace SadhanSewa.API.Controllers;

/// <summary>
/// Admin CRUD for vendors + dropdown for other features.
/// </summary>
[ApiController]
[Route("api/vendors")]
public class VendorsController(IVendorService vendorService) : ControllerBase
{
    /// <summary>
    /// Returns all vendors (Admin only).
    /// </summary>
    [HttpGet]
    [Authorize(Roles = "Admin")]
    public async Task<ActionResult<ApiResponse<List<VendorDto>>>> GetAllAsync()
    {
        var data = await vendorService.GetAllAsync();
        return Ok(ApiResponse<List<VendorDto>>.Ok(data, "Vendors retrieved."));
    }

    /// <summary>
    /// Returns a vendor by id (Admin only).
    /// </summary>
    [HttpGet("{id:int}")]
    [Authorize(Roles = "Admin")]
    public async Task<ActionResult<ApiResponse<VendorDto>>> GetByIdAsync(int id)
    {
        var data = await vendorService.GetByIdAsync(id);
        if (data is null) return NotFound(ApiResponse<VendorDto>.Fail("Vendor not found."));
        return Ok(ApiResponse<VendorDto>.Ok(data, "Vendor retrieved."));
    }

    /// <summary>
    /// Returns active vendors for dropdown (Admin and Staff).
    /// </summary>
    [HttpGet("dropdown")]
    [Authorize(Roles = "Admin,Staff")]
    public async Task<ActionResult<ApiResponse<List<VendorDropdownDto>>>> GetDropdownAsync()
    {
        var data = await vendorService.GetDropdownAsync();
        return Ok(ApiResponse<List<VendorDropdownDto>>.Ok(data, "Vendors retrieved."));
    }

    /// <summary>
    /// Creates a new vendor (Admin only).
    /// </summary>
    [HttpPost]
    [Authorize(Roles = "Admin")]
    public async Task<ActionResult<ApiResponse<VendorDto>>> CreateAsync([FromBody] CreateVendorDto dto)
    {
        if (!ModelState.IsValid)
            return BadRequest(ApiResponse<VendorDto>.Fail("Validation failed.", GetModelErrors()));

        try
        {
            var data = await vendorService.CreateAsync(dto);
            return StatusCode(StatusCodes.Status201Created,
                ApiResponse<VendorDto>.Ok(data, "Vendor created."));
        }
        catch (InvalidOperationException ex)
        {
            return Conflict(ApiResponse<VendorDto>.Fail(ex.Message));
        }
    }

    /// <summary>
    /// Updates an existing vendor (Admin only).
    /// </summary>
    [HttpPut("{id:int}")]
    [Authorize(Roles = "Admin")]
    public async Task<ActionResult<ApiResponse<VendorDto>>> UpdateAsync(int id, [FromBody] UpdateVendorDto dto)
    {
        if (!ModelState.IsValid)
            return BadRequest(ApiResponse<VendorDto>.Fail("Validation failed.", GetModelErrors()));

        try
        {
            var data = await vendorService.UpdateAsync(id, dto);
            if (data is null) return NotFound(ApiResponse<VendorDto>.Fail("Vendor not found."));
            return Ok(ApiResponse<VendorDto>.Ok(data, "Vendor updated."));
        }
        catch (InvalidOperationException ex)
        {
            return Conflict(ApiResponse<VendorDto>.Fail(ex.Message));
        }
    }

    /// <summary>
    /// Deletes a vendor if it has no linked parts or invoices (Admin only).
    /// </summary>
    [HttpDelete("{id:int}")]
    [Authorize(Roles = "Admin")]
    public async Task<ActionResult<ApiResponse<string>>> DeleteAsync(int id)
    {
        try
        {
            var ok = await vendorService.DeleteAsync(id);
            if (!ok) return NotFound(ApiResponse<string>.Fail("Vendor not found."));
            return Ok(ApiResponse<string>.Ok("deleted", "Vendor deleted."));
        }
        catch (InvalidOperationException ex)
        {
            return Conflict(ApiResponse<string>.Fail(ex.Message));
        }
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
