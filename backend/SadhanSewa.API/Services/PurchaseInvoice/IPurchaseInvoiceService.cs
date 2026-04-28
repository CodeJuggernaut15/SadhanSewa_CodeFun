using SadhanSewa.API.DTOs.PurchaseInvoice;

namespace SadhanSewa.API.Services.PurchaseInvoice;

/// <summary>
/// Defines purchase invoice application operations.
/// </summary>
public interface IPurchaseInvoiceService
{
    /// <summary>
    /// Returns all purchase invoices.
    /// </summary>
    Task<List<PurchaseInvoiceSummaryDto>> GetAllAsync();

    /// <summary>
    /// Returns a purchase invoice by id.
    /// </summary>
    Task<PurchaseInvoiceDetailDto?> GetByIdAsync(int id);

    /// <summary>
    /// Returns the audit summary for an invoice.
    /// </summary>
    Task<AuditSummaryDto?> GetAuditSummaryAsync(int invoiceId);

    /// <summary>
    /// Returns active vendors for dropdown binding.
    /// </summary>
    Task<List<VendorDropdownDto>> GetVendorDropdownAsync();

    /// <summary>
    /// Creates a new purchase invoice.
    /// </summary>
    Task<int> CreateAsync(CreatePurchaseInvoiceDto dto, int createdByUserId);

    /// <summary>
    /// Adds a line item to an existing invoice.
    /// </summary>
    Task<LineItemDto> AddLineItemAsync(int invoiceId, CreateLineItemDto dto);

    /// <summary>
    /// Removes a line item from an existing invoice.
    /// </summary>
    Task<bool> RemoveLineItemAsync(int invoiceId, int lineItemId);

    /// <summary>
    /// Recalculates low stock alert flags for invoice items.
    /// </summary>
    Task<int> SyncLowStockAlertAsync(int invoiceId);

    /// <summary>
    /// Finalizes an existing invoice.
    /// </summary>
    Task<bool> FinalizeAsync(int invoiceId);
}
