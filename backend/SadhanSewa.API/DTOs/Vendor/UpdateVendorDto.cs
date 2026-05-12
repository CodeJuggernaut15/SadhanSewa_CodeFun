using System.ComponentModel.DataAnnotations;

namespace SadhanSewa.API.DTOs.Vendor;

/// <summary>
/// Payload for updating an existing vendor.
/// </summary>
public class UpdateVendorDto
{
    [Required, MaxLength(200)]
    public string Name { get; set; } = string.Empty;

    [MaxLength(200)]
    public string? Location { get; set; }

    [MaxLength(50)]
    public string? Contact { get; set; }

    [EmailAddress, MaxLength(200)]
    public string? Email { get; set; }

    [MaxLength(100)]
    public string? Category { get; set; }

    [MaxLength(20)]
    public string Status { get; set; } = "Active";
}
