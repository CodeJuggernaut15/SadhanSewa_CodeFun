namespace SadhanSewa.API.DTOs.Auth;

/// <summary>
/// Response returned after successful login or registration.
/// </summary>
public class AuthResponseDto
{
    public string Token { get; set; } = string.Empty;
    public int UserId { get; set; }
    public string FullName { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string Role { get; set; } = string.Empty;
    public string Phone { get; set; } = string.Empty;
    public bool IsActive { get; set; }
    public DateTime ExpiresAt { get; set; }
}
