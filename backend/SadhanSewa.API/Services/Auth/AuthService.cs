using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using SadhanSewa.API.Data;
using SadhanSewa.API.DTOs.Auth;
using SadhanSewa.API.Models;

namespace SadhanSewa.API.Services.Auth;

/// <summary>
/// Implements authentication using BCrypt password hashing and JWT tokens.
/// </summary>
public class AuthService(ApplicationDbContext db, IConfiguration config, ILogger<AuthService> logger)
    : IAuthService
{
    private readonly ApplicationDbContext _db = db;
    private readonly IConfiguration _config = config;
    private readonly ILogger<AuthService> _logger = logger;

    private const int CustomerRoleId = 3;
    private const int StaffRoleId = 2;

    /// <inheritdoc />
    public async Task<AuthResponseDto> RegisterCustomerAsync(RegisterDto dto)
    {
        return await CreateUserAsync(dto, CustomerRoleId);
    }

    /// <inheritdoc />
    public async Task<AuthResponseDto> CreateStaffAsync(RegisterDto dto)
    {
        return await CreateUserAsync(dto, StaffRoleId);
    }

    /// <inheritdoc />
    public async Task<AuthResponseDto> LoginAsync(LoginDto dto)
    {
        var user = await _db.Users
            .Include(u => u.Role)
            .FirstOrDefaultAsync(u => u.Email == dto.Email);

        if (user is null || !BCrypt.Net.BCrypt.Verify(dto.Password, user.PasswordHash))
            throw new UnauthorizedAccessException("Invalid email or password.");

        if (!user.IsActive)
            throw new UnauthorizedAccessException("Account is deactivated. Please contact support.");

        _logger.LogInformation("User {Email} authenticated successfully.", user.Email);
        return GenerateAuthResponse(user);
    }

    public async Task<AuthResponseDto?> GetCurrentUserAsync(int userId)
    {
        var user = await _db.Users
            .AsNoTracking()
            .Include(u => u.Role)
            .FirstOrDefaultAsync(u => u.Id == userId);

        if (user is null) return null;

        return MapToDto(user);
    }

    /// <inheritdoc />
    public async Task<IEnumerable<AuthResponseDto>> GetAllUsersAsync()
    {
        var users = await _db.Users
            .AsNoTracking()
            .Include(u => u.Role)
            .OrderByDescending(u => u.CreatedAt)
            .ToListAsync();

        return users.Select(MapToDto);
    }

    /// <inheritdoc />
    public async Task<bool> ToggleUserStatusAsync(int userId)
    {
        var user = await _db.Users.FindAsync(userId);
        if (user is null) return false;

        user.IsActive = !user.IsActive;
        user.UpdatedAt = DateTime.UtcNow;
        await _db.SaveChangesAsync();
        return true;
    }

    /// <inheritdoc />
    public async Task<bool> DeleteUserAsync(int userId)
    {
        var user = await _db.Users.FindAsync(userId);
        if (user is null) return false;

        _db.Users.Remove(user);
        await _db.SaveChangesAsync();
        return true;
    }

    private static AuthResponseDto MapToDto(User user)
    {
        return new AuthResponseDto
        {
            UserId = user.Id,
            FullName = user.FullName,
            Email = user.Email,
            Phone = user.Phone,
            Role = user.Role.Name,
            IsActive = user.IsActive,
            Token = string.Empty,
            ExpiresAt = DateTime.MinValue
        };
    }

    // ── Private helpers ──────────────────────────────────────────

    private async Task<AuthResponseDto> CreateUserAsync(RegisterDto dto, int roleId)
    {
        if (await _db.Users.AnyAsync(u => u.Email == dto.Email))
            throw new InvalidOperationException("A user with this email already exists.");

        var user = new User
        {
            FullName = dto.FullName,
            Email = dto.Email,
            Phone = dto.Phone,
            PasswordHash = BCrypt.Net.BCrypt.HashPassword(dto.Password),
            RoleId = roleId,
            IsActive = true,
            CreatedAt = DateTime.UtcNow,
            UpdatedAt = DateTime.UtcNow
        };

        _db.Users.Add(user);
        await _db.SaveChangesAsync();

        // Reload with Role navigation for token generation
        await _db.Entry(user).Reference(u => u.Role).LoadAsync();

        _logger.LogInformation("New {Role} user created: {Email}", user.Role.Name, user.Email);
        return GenerateAuthResponse(user);
    }

    private AuthResponseDto GenerateAuthResponse(User user)
    {
        var expirationMinutes = _config.GetValue<int>("Jwt:ExpirationInMinutes");
        var expiresAt = DateTime.UtcNow.AddMinutes(expirationMinutes);

        var claims = new List<Claim>
        {
            new(ClaimTypes.NameIdentifier, user.Id.ToString()),
            new(ClaimTypes.Email, user.Email),
            new(ClaimTypes.Name, user.FullName),
            new(ClaimTypes.Role, user.Role.Name)
        };

        var key = new SymmetricSecurityKey(
            Encoding.UTF8.GetBytes(_config["Jwt:Key"]!));

        var token = new JwtSecurityToken(
            issuer: _config["Jwt:Issuer"],
            audience: _config["Jwt:Audience"],
            claims: claims,
            expires: expiresAt,
            signingCredentials: new SigningCredentials(key, SecurityAlgorithms.HmacSha256));

        return new AuthResponseDto
        {
            Token = new JwtSecurityTokenHandler().WriteToken(token),
            UserId = user.Id,
            FullName = user.FullName,
            Email = user.Email,
            Role = user.Role.Name,
            ExpiresAt = expiresAt
        };
    }
}
