using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SadhanSewa.API.Data;
using SadhanSewa.API.DTOs;
using SadhanSewa.API.DTOs.Service;
using SadhanSewa.API.Models;

namespace SadhanSewa.API.Controllers;

[ApiController]
[Authorize]
[Route("api/part-requests")]
public class PartRequestsController(ApplicationDbContext db) : ControllerBase
{
    [HttpGet]
    public async Task<ActionResult<ApiResponse<List<PartRequestDto>>>> GetAllAsync()
    {
        var userId = GetUserId();
        var query = db.PartRequests.AsNoTracking().Include(r => r.Customer).AsQueryable();

        if (User.IsInRole("Customer"))
            query = query.Where(r => r.CustomerId == userId);

        var requests = await query
            .OrderByDescending(r => r.CreatedAt)
            .ToListAsync();

        var data = requests.Select(Map).ToList();

        return Ok(ApiResponse<List<PartRequestDto>>.Ok(data, "Part requests retrieved."));
    }

    [HttpPost]
    [Authorize(Roles = "Customer,Admin,Staff")]
    public async Task<ActionResult<ApiResponse<PartRequestDto>>> CreateAsync([FromBody] CreatePartRequestDto dto)
    {
        if (!ModelState.IsValid)
            return BadRequest(ApiResponse<PartRequestDto>.Fail("Validation failed.", GetModelErrors()));

        var request = new PartRequest
        {
            CustomerId = GetUserId(),
            PartName = dto.PartName.Trim(),
            Category = string.IsNullOrWhiteSpace(dto.Category) ? null : dto.Category.Trim(),
            Description = string.IsNullOrWhiteSpace(dto.Description) ? null : dto.Description.Trim(),
            Status = "Pending",
            CreatedAt = DateTime.UtcNow
        };

        db.PartRequests.Add(request);
        await db.SaveChangesAsync();

        var saved = await db.PartRequests.AsNoTracking().Include(r => r.Customer).FirstAsync(r => r.Id == request.Id);
        return StatusCode(StatusCodes.Status201Created,
            ApiResponse<PartRequestDto>.Ok(Map(saved), "Part request submitted."));
    }

    [HttpPut("{id:int}/status")]
    [Authorize(Roles = "Admin,Staff")]
    public async Task<ActionResult<ApiResponse<PartRequestDto>>> UpdateStatusAsync(int id, [FromBody] UpdateStatusDto dto)
    {
        var allowed = new[] { "Pending", "In Progress", "Completed", "Rejected" };
        if (!allowed.Contains(dto.Status))
            return BadRequest(ApiResponse<PartRequestDto>.Fail("Invalid request status."));

        var request = await db.PartRequests.Include(r => r.Customer).FirstOrDefaultAsync(r => r.Id == id);
        if (request is null)
            return NotFound(ApiResponse<PartRequestDto>.Fail("Part request not found."));

        request.Status = dto.Status;
        await db.SaveChangesAsync();

        return Ok(ApiResponse<PartRequestDto>.Ok(Map(request), "Part request updated."));
    }

    private int GetUserId() => int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);

    private static PartRequestDto Map(PartRequest r) => new()
    {
        Id = r.Id,
        CustomerId = r.CustomerId,
        CustomerName = r.Customer.FullName,
        PartName = r.PartName,
        Category = r.Category,
        Description = r.Description,
        Status = r.Status,
        CreatedAt = r.CreatedAt
    };

    private Dictionary<string, string[]> GetModelErrors()
    {
        return ModelState
            .Where(x => x.Value?.Errors.Count > 0)
            .ToDictionary(kvp => kvp.Key, kvp => kvp.Value!.Errors.Select(e => e.ErrorMessage).ToArray());
    }
}
