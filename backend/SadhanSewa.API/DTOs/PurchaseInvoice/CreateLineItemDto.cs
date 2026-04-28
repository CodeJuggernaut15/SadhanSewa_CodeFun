namespace SadhanSewa.API.DTOs.PurchaseInvoice;

/// <summary>
/// Request payload for creating a purchase invoice line item.
/// </summary>
public class CreateLineItemDto
{
    public int PartId { get; set; }
    public string ComponentName { get; set; } = string.Empty;
    public string VendorName { get; set; } = string.Empty;
    public int Volume { get; set; }
    public decimal UnitCost { get; set; }
}
