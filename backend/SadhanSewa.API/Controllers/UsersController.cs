using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SadhanSewa.API.DTOs;
using SadhanSewa.API.DTOs.Auth;
using SadhanSewa.API.Services.Auth;

namespace SadhanSewa.API.Controllers;

/// <summary>
/// Handles administrative user management tasks.
/// Only accessible by users with the 'Admin' role.
/// </summary>
[ApiController]
[Route("api/users")]
[Authorize(Roles = "Admin")]
public class UsersController(IAuthService authService) : ControllerBase
{
    private readonly IAuthService _authService = authService;

    /// <summary>
    /// Returns a list of all users in the system.
    /// </summary>
    [HttpGet]
    public async Task<ActionResult<ApiResponse<IEnumerable<AuthResponseDto>>>> GetAllUsers()
    {
        var data = await _authService.GetAllUsersAsync();
        return Ok(ApiResponse<IEnumerable<AuthResponseDto>>.Ok(data, "Users retrieved successfully."));
    }

    /// <summary>
    /// Toggles the active status of a user.
    /// </summary>
    [HttpPut("{id}/toggle-status")]
    public async Task<ActionResult<ApiResponse<bool>>> ToggleStatus(int id)
    {
        var success = await _authService.ToggleUserStatusAsync(id);
        if (!success) return NotFound(ApiResponse<bool>.Fail("User not found."));
        return Ok(ApiResponse<bool>.Ok(true, "User status toggled."));
    }

    /// <summary>
    /// Permanently deletes a user.
    /// </summary>
    [HttpDelete("{id}")]
    public async Task<ActionResult<ApiResponse<bool>>> DeleteUser(int id)
    {
        var success = await _authService.DeleteUserAsync(id);
        if (!success) return NotFound(ApiResponse<bool>.Fail("User not found."));
        return Ok(ApiResponse<bool>.Ok(true, "User deleted."));
    }
}
