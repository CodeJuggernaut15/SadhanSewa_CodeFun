using System.ComponentModel.DataAnnotations;

namespace SadhanSewa.API.DTOs.Auth;

/// <summary>
/// Payload for changing a user's role.
/// </summary>
public class ChangeRoleDto
{
    // 1 = Admin, 2 = Staff (only these two are allowed here)
    [Required]
    [Range(1, 2, ErrorMessage = "Role must be 1 (Admin) or 2 (Staff).")]
    public int RoleId { get; set; }
}
