using System.ComponentModel.DataAnnotations;

namespace SadhanSewa.API.DTOs.Vendor;

/// <summary>
/// Payload for creating a new vendor.
/// </summary>
public class CreateVendorDto
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

    // defaults to Active if not sent
    [MaxLength(20)]
    public string Status { get; set; } = "Active";
}
