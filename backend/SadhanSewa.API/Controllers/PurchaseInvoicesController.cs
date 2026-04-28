using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SadhanSewa.API.DTOs;
using SadhanSewa.API.DTOs.PurchaseInvoice;
using SadhanSewa.API.Services.PurchaseInvoice;

namespace SadhanSewa.API.Controllers;

/// <summary>
/// Exposes purchase invoice API endpoints.
/// </summary>
[ApiController]
[Authorize(Roles = "Admin")]
[Route("api/purchase-invoices")]
public class PurchaseInvoicesController(IPurchaseInvoiceService purchaseInvoiceService) : ControllerBase
{
    /// <summary>
    /// Returns all purchase invoices.
    /// </summary>
    [HttpGet]
    public async Task<ActionResult<ApiResponse<List<PurchaseInvoiceSummaryDto>>>> GetAllAsync()
    {
        var data = await purchaseInvoiceService.GetAllAsync();
        return Ok(ApiResponse<List<PurchaseInvoiceSummaryDto>>.Ok(data, "Purchase invoices retrieved."));
    }

    /// <summary>
    /// Returns a purchase invoice by identifier.
    /// </summary>
    [HttpGet("{id:int}")]
    public async Task<ActionResult<ApiResponse<PurchaseInvoiceDetailDto>>> GetByIdAsync(int id)
    {
        var data = await purchaseInvoiceService.GetByIdAsync(id);
        if (data is null) return NotFound(ApiResponse<PurchaseInvoiceDetailDto>.Fail("Purchase invoice not found."));
        return Ok(ApiResponse<PurchaseInvoiceDetailDto>.Ok(data, "Purchase invoice retrieved."));
    }

    /// <summary>
    /// Returns audit summary metrics for a purchase invoice.
    /// </summary>
    [HttpGet("{id:int}/audit")]
    public async Task<ActionResult<ApiResponse<AuditSummaryDto>>> GetAuditSummaryAsync(int id)
    {
        var data = await purchaseInvoiceService.GetAuditSummaryAsync(id);
        if (data is null) return NotFound(ApiResponse<AuditSummaryDto>.Fail("Purchase invoice not found."));
        return Ok(ApiResponse<AuditSummaryDto>.Ok(data, "Audit summary retrieved."));
    }

    /// <summary>
    /// Creates a purchase invoice.
    /// </summary>
    [HttpPost]
    public async Task<ActionResult<ApiResponse<int>>> CreateAsync([FromBody] CreatePurchaseInvoiceDto dto)
    {
        var errors = PurchaseInvoiceValidator.ValidateCreate(dto);
        if (errors is not null) return BadRequest(ApiResponse<int>.Fail("Validation failed.", errors));
        var createdByUserId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
        var id = await purchaseInvoiceService.CreateAsync(dto, createdByUserId);
        return CreatedAtAction(nameof(GetByIdAsync), new { id }, ApiResponse<int>.Ok(id, "Purchase invoice created."));
    }

    /// <summary>
    /// Adds a line item to a purchase invoice.
    /// </summary>
    [HttpPost("{id:int}/line-items")]
    public async Task<ActionResult<ApiResponse<LineItemDto>>> AddLineItemAsync(int id, [FromBody] CreateLineItemDto dto)
    {
        var errors = PurchaseInvoiceValidator.ValidateLineItem(dto);
        if (errors is not null) return BadRequest(ApiResponse<LineItemDto>.Fail("Validation failed.", errors));
        var data = await purchaseInvoiceService.AddLineItemAsync(id, dto);
        return StatusCode(StatusCodes.Status201Created, ApiResponse<LineItemDto>.Ok(data, "Line item added."));
    }

    /// <summary>
    /// Removes a line item from a purchase invoice.
    /// </summary>
    [HttpDelete("{id:int}/line-items/{lineItemId:int}")]
    public async Task<ActionResult<ApiResponse<string>>> RemoveLineItemAsync(int id, int lineItemId)
    {
        await purchaseInvoiceService.RemoveLineItemAsync(id, lineItemId);
        return Ok(ApiResponse<string>.Ok("Removed", "Line item removed successfully."));
    }

    /// <summary>
    /// Synchronizes low stock alerts for invoice items.
    /// </summary>
    [HttpPost("{id:int}/sync-low-stock")]
    public async Task<ActionResult<ApiResponse<int>>> SyncLowStockAlertAsync(int id)
    {
        var count = await purchaseInvoiceService.SyncLowStockAlertAsync(id);
        return Ok(ApiResponse<int>.Ok(count, "Low stock alerts synchronized."));
    }

    /// <summary>
    /// Finalizes a purchase invoice.
    /// </summary>
    [HttpPut("{id:int}/finalize")]
    public async Task<ActionResult<ApiResponse<string>>> FinalizeAsync(int id)
    {
        await purchaseInvoiceService.FinalizeAsync(id);
        return Ok(ApiResponse<string>.Ok("Finalized", "Purchase invoice finalized successfully."));
    }
}
