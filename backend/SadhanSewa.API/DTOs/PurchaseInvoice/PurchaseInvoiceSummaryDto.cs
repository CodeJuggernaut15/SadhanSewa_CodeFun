namespace SadhanSewa.API.DTOs.PurchaseInvoice;

/// <summary>
/// Summary payload for listing purchase invoices.
/// </summary>
public class PurchaseInvoiceSummaryDto
{
    public int Id { get; set; }
    public string SessionCode { get; set; } = string.Empty;
    public string VendorName { get; set; } = string.Empty;
    public DateTime ExpectedIntakeDate { get; set; }
    public string Status { get; set; } = string.Empty;
    public decimal TotalAmount { get; set; }
    public int LineItemCount { get; set; }
    public DateTime CreatedAt { get; set; }
}
