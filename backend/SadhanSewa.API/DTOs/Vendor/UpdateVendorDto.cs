using System.ComponentModel.DataAnnotations;

namespace SadhanSewa.API.DTOs.Vendor;

// all fields optional — only send what needs to change
public class UpdateVendorDto
{
    [MaxLength(200)]
    public string? Name { get; set; }

    [MaxLength(200)]
    public string? Location { get; set; }

    [MaxLength(50)]
    public string? Contact { get; set; }

    [EmailAddress, MaxLength(200)]
    public string? Email { get; set; }

    [MaxLength(100)]
    public string? Category { get; set; }

    [MaxLength(20)]
    public string? Status { get; set; }
}
