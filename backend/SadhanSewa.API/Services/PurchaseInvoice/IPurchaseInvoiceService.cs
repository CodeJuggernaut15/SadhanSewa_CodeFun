using SadhanSewa.API.DTOs.PurchaseInvoice;

namespace SadhanSewa.API.Services.PurchaseInvoice;

public interface IPurchaseInvoiceService
{
    Task<List<PurchaseInvoiceSummaryDto>> GetAllAsync();
    Task<PurchaseInvoiceDetailDto?> GetByIdAsync(int id);
    Task<AuditSummaryDto?> GetAuditSummaryAsync(int invoiceId);
    Task<int> CreateAsync(CreatePurchaseInvoiceDto dto, int createdByUserId);
    Task<LineItemDto> AddLineItemAsync(int invoiceId, CreateLineItemDto dto);
    Task<bool> RemoveLineItemAsync(int invoiceId, int lineItemId);
    Task<int> SyncLowStockAlertAsync(int invoiceId);
    Task<bool> FinalizeAsync(int invoiceId);
}
