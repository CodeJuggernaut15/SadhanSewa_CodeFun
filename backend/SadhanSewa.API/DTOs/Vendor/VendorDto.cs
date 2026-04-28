namespace SadhanSewa.API.DTOs.Vendor;

public class VendorDto
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string? Location { get; set; }
    public string? Contact { get; set; }
    public string? Email { get; set; }
    public string? Category { get; set; }
    public string Status { get; set; } = string.Empty;
    public DateTime CreatedAt { get; set; }
}
