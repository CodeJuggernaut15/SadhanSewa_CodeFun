using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SadhanSewa.API.DTOs;
using SadhanSewa.API.DTOs.Auth;
using SadhanSewa.API.Services.Auth;

namespace SadhanSewa.API.Controllers;

/// <summary>
/// Handles authentication and user creation endpoints.
/// </summary>
[ApiController]
[Route("api/auth")]
public class AuthController(IAuthService authService) : ControllerBase
{
    /// <summary>
    /// Public endpoint — customer self-registration.
    /// </summary>
    [HttpPost("register")]
    public async Task<ActionResult<ApiResponse<AuthResponseDto>>> Register([FromBody] RegisterDto dto)
    {
        var data = await authService.RegisterCustomerAsync(dto);
        return StatusCode(StatusCodes.Status201Created,
            ApiResponse<AuthResponseDto>.Ok(data, "Customer registered successfully."));
    }

    /// <summary>
    /// Public endpoint — authenticates a user and returns a JWT.
    /// </summary>
    [HttpPost("login")]
    public async Task<ActionResult<ApiResponse<AuthResponseDto>>> Login([FromBody] LoginDto dto)
    {
        var data = await authService.LoginAsync(dto);
        return Ok(ApiResponse<AuthResponseDto>.Ok(data, "Login successful."));
    }

    /// <summary>
    /// Staff or Admin registers a customer on their behalf.
    /// </summary>
    [Authorize(Roles = "Staff,Admin")]
    [HttpPost("register-customer")]
    public async Task<ActionResult<ApiResponse<AuthResponseDto>>> RegisterCustomer([FromBody] RegisterDto dto)
    {
        var data = await authService.RegisterCustomerAsync(dto);
        return StatusCode(StatusCodes.Status201Created,
            ApiResponse<AuthResponseDto>.Ok(data, "Customer registered by staff."));
    }

    /// <summary>
    /// Admin creates a staff account. Staff cannot self-register.
    /// </summary>
    [Authorize(Roles = "Admin")]
    [HttpPost("create-staff")]
    public async Task<ActionResult<ApiResponse<AuthResponseDto>>> CreateStaff([FromBody] RegisterDto dto)
    {
        var data = await authService.CreateStaffAsync(dto);
        return StatusCode(StatusCodes.Status201Created,
            ApiResponse<AuthResponseDto>.Ok(data, "Staff account created."));
    }

    /// <summary>
    /// Returns the current authenticated user's profile.
    /// </summary>
    [Authorize]
    [HttpGet("me")]
    public async Task<ActionResult<ApiResponse<AuthResponseDto>>> GetCurrentUser()
    {
        var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
        var data = await authService.GetCurrentUserAsync(userId);
        if (data is null) return NotFound(ApiResponse<AuthResponseDto>.Fail("User not found."));
        return Ok(ApiResponse<AuthResponseDto>.Ok(data, "Current user retrieved."));
    }
}
