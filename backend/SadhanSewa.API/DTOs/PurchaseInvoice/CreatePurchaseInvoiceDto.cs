namespace SadhanSewa.API.DTOs.PurchaseInvoice;

/// <summary>
/// Request payload for creating a purchase invoice.
/// </summary>
public class CreatePurchaseInvoiceDto
{
    public int VendorId { get; set; }
    public DateTime ExpectedIntakeDate { get; set; }
    public List<CreateLineItemDto> LineItems { get; set; } = new();
}
