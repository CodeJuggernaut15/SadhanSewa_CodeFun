using System.ComponentModel.DataAnnotations;

namespace SadhanSewa.API.DTOs.Auth;

/// <summary>
/// Payload for authenticating a user.
/// </summary>
public class LoginDto
{
    [Required, EmailAddress]
    public string Email { get; set; } = string.Empty;

    [Required]
    public string Password { get; set; } = string.Empty;
}
