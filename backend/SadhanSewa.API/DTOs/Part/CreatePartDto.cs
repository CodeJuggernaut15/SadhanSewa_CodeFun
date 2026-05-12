using System.ComponentModel.DataAnnotations;

namespace SadhanSewa.API.DTOs.Part;

/// <summary>
/// Payload for creating a part.
/// </summary>
public class CreatePartDto
{
    [Required, MaxLength(200)]
    public string Name { get; set; } = string.Empty;

    [Required, MaxLength(50)]
    public string SKU { get; set; } = string.Empty;

    [MaxLength(100)]
    public string? Category { get; set; }

    [Range(0, double.MaxValue)]
    public decimal Price { get; set; }

    [Range(0, int.MaxValue)]
    public int Stock { get; set; }

    [Range(0, int.MaxValue)]
    public int LowStockThreshold { get; set; } = 10;

    public int? VendorId { get; set; }
}
