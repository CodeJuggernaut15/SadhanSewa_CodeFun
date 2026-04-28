namespace SadhanSewa.API.DTOs.PurchaseInvoice;

/// <summary>
/// Detailed payload for a purchase invoice.
/// </summary>
public class PurchaseInvoiceDetailDto : PurchaseInvoiceSummaryDto
{
    public List<LineItemDto> LineItems { get; set; } = new();
}
