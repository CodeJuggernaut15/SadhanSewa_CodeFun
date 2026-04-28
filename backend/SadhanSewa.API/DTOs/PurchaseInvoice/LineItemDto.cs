namespace SadhanSewa.API.DTOs.PurchaseInvoice;

/// <summary>
/// Represents a purchase invoice line item.
/// </summary>
public class LineItemDto
{
    public int Id { get; set; }
    public string ComponentName { get; set; } = string.Empty;
    public string VendorName { get; set; } = string.Empty;
    public int Volume { get; set; }
    public decimal UnitCost { get; set; }
    public decimal TotalCost { get; set; }
    public bool IsLowStockAlert { get; set; }
}
