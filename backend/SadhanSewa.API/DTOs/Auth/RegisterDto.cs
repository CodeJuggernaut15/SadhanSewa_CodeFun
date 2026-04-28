using System.ComponentModel.DataAnnotations;

namespace SadhanSewa.API.DTOs.Auth;

/// <summary>
/// Payload for registering a new user (customer self-register or staff/admin creates a user).
/// </summary>
public class RegisterDto
{
    [Required, MaxLength(150)]
    public string FullName { get; set; } = string.Empty;

    [Required, EmailAddress, MaxLength(200)]
    public string Email { get; set; } = string.Empty;

    [MaxLength(20)]
    public string? Phone { get; set; }

    [Required, MinLength(8), MaxLength(100)]
    public string Password { get; set; } = string.Empty;
}
