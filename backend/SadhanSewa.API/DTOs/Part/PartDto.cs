namespace SadhanSewa.API.DTOs.Part;

/// <summary>
/// Part returned from list/detail endpoints.
/// </summary>
public class PartDto
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string SKU { get; set; } = string.Empty;
    public string? Category { get; set; }
    public decimal Price { get; set; }
    public int Stock { get; set; }
    public int LowStockThreshold { get; set; }
    public int? VendorId { get; set; }
    public string? VendorName { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }
}
