namespace SadhanSewa.API.DTOs.PurchaseInvoice;

/// <summary>
/// Represents high-level audit metrics for an invoice.
/// </summary>
public class AuditSummaryDto
{
    public decimal NetManifestTotal { get; set; }
    public decimal AssetBulk { get; set; }
    public string IntakeScale { get; set; } = string.Empty;
    public string CurrentFlow { get; set; } = string.Empty;
}
