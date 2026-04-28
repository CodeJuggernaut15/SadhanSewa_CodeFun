using Microsoft.AspNetCore.Mvc;
using SadhanSewa.API.DTOs;
using SadhanSewa.API.DTOs.PurchaseInvoice;
using SadhanSewa.API.Services.PurchaseInvoice;

namespace SadhanSewa.API.Controllers;

/// <summary>
/// Exposes vendor endpoints required by purchase invoices.
/// </summary>
[ApiController]
[Route("api/vendors")]
public class VendorsController(IPurchaseInvoiceService purchaseInvoiceService) : ControllerBase
{
    /// <summary>
    /// Returns active vendors for dropdown data sources.
    /// </summary>
    [HttpGet("dropdown")]
    public async Task<ActionResult<ApiResponse<List<VendorDropdownDto>>>> GetDropdownAsync()
    {
        var data = await purchaseInvoiceService.GetVendorDropdownAsync();
        return Ok(ApiResponse<List<VendorDropdownDto>>.Ok(data, "Vendors retrieved."));
    }
}
