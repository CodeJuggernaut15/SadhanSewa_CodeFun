using SadhanSewa.API.DTOs.Auth;

namespace SadhanSewa.API.Services.Auth;

/// <summary>
/// Defines authentication and user-management operations.
/// </summary>
public interface IAuthService
{
    /// <summary>
    /// Registers a new customer (RoleId = 3).
    /// Used by both public self-registration and staff-assisted registration.
    /// </summary>
    Task<AuthResponseDto> RegisterCustomerAsync(RegisterDto dto);

    /// <summary>
    /// Authenticates a user and returns a JWT.
    /// </summary>
    Task<AuthResponseDto> LoginAsync(LoginDto dto);

    /// <summary>
    /// Creates a staff account (RoleId = 2). Only callable by Admin.
    /// </summary>
    Task<AuthResponseDto> CreateStaffAsync(RegisterDto dto);

    /// <summary>
    /// Returns user info for the given user id (used by /me endpoint).
    /// </summary>
    Task<AuthResponseDto?> GetCurrentUserAsync(int userId);

    /// <summary>
    /// Returns a list of all users in the system.
    /// </summary>
    Task<IEnumerable<AuthResponseDto>> GetAllUsersAsync();

    /// <summary>
    /// Toggles the IsActive status of a user.
    /// </summary>
    Task<bool> ToggleUserStatusAsync(int userId);

    /// <summary>
    /// Permanently removes a user from the system.
    /// </summary>
    Task<bool> DeleteUserAsync(int userId);
}
