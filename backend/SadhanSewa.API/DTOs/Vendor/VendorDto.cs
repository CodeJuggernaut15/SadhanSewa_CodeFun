namespace SadhanSewa.API.DTOs.Vendor;

/// <summary>
/// Vendor data returned from list and detail endpoints.
/// </summary>
public class VendorDto
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string? Location { get; set; }
    public string? Contact { get; set; }
    public string? Email { get; set; }
    public string? Category { get; set; }
    public string Status { get; set; } = "Active";
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }
}
