using System.ComponentModel.DataAnnotations;

namespace SadhanSewa.API.DTOs.Auth;

/// <summary>
/// Payload for registering a new user (customer self-register or staff/admin creates a user).
/// </summary>
public class RegisterDto
{
    [Required, MinLength(3), MaxLength(150)]
    [RegularExpression(@"^[A-Za-z][A-Za-z\s.'-]*$", ErrorMessage = "Full name can only contain letters, spaces, apostrophes, hyphens, or periods.")]
    public string FullName { get; set; } = string.Empty;

    [Required, EmailAddress, MaxLength(200)]
    public string Email { get; set; } = string.Empty;

    [MaxLength(20)]
    [RegularExpression(@"^(\+977[-\s]?)?(98|97)\d{8}$|^(\+977[-\s]?)?[1-9]\d{6,8}$", ErrorMessage = "Phone number must be a valid Nepal phone number.")]
    public string? Phone { get; set; }

    [Required, MinLength(8), MaxLength(100)]
    [RegularExpression(@"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$", ErrorMessage = "Password must include uppercase, lowercase, number, and symbol.")]
    public string Password { get; set; } = string.Empty;
}
