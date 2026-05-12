using System.ComponentModel.DataAnnotations;

namespace SadhanSewa.API.DTOs.Vendor;

/// <summary>
/// Payload for creating a new vendor.
/// </summary>
public class CreateVendorDto
{
    [Required, MinLength(3), MaxLength(200)]
    [RegularExpression(@"^[A-Za-z0-9][A-Za-z0-9\s&.,'()-]*$", ErrorMessage = "Vendor name contains invalid characters.")]
    public string Name { get; set; } = string.Empty;

    [Required, MinLength(3), MaxLength(200)]
    public string? Location { get; set; }

    [Required, MaxLength(50)]
    [RegularExpression(@"^(\+977[-\s]?)?(98|97)\d{8}$|^(\+977[-\s]?)?[1-9]\d{6,8}$", ErrorMessage = "Contact must be a valid Nepal phone number.")]
    public string? Contact { get; set; }

    [EmailAddress, MaxLength(200)]
    public string? Email { get; set; }

    [Required, MinLength(3), MaxLength(100)]
    [RegularExpression(@"^[A-Za-z0-9][A-Za-z0-9\s&.,'()-]*$", ErrorMessage = "Category contains invalid characters.")]
    public string? Category { get; set; }

    // defaults to Active if not sent
    [Required, RegularExpression("^(Active|Inactive)$", ErrorMessage = "Status must be Active or Inactive.")]
    [MaxLength(20)]
    public string Status { get; set; } = "Active";
}
