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
[Route("api/reviews")]
public class ReviewsController(ApplicationDbContext db) : ControllerBase
{
    [HttpGet]
    public async Task<ActionResult<ApiResponse<List<ReviewDto>>>> GetAllAsync()
    {
        var userId = GetUserId();
        var query = db.Reviews.AsNoTracking().Include(r => r.Customer).AsQueryable();

        if (User.IsInRole("Customer"))
            query = query.Where(r => r.CustomerId == userId);

        var reviews = await query
            .OrderByDescending(r => r.CreatedAt)
            .ToListAsync();

        var data = reviews.Select(Map).ToList();

        return Ok(ApiResponse<List<ReviewDto>>.Ok(data, "Reviews retrieved."));
    }

    [HttpPost]
    [Authorize(Roles = "Customer,Admin,Staff")]
    public async Task<ActionResult<ApiResponse<ReviewDto>>> CreateAsync([FromBody] CreateReviewDto dto)
    {
        if (!ModelState.IsValid)
            return BadRequest(ApiResponse<ReviewDto>.Fail("Validation failed.", GetModelErrors()));

        var userId = GetUserId();
        if (dto.AppointmentId is not null && User.IsInRole("Customer"))
        {
            var ownsAppointment = await db.Appointments.AnyAsync(a => a.Id == dto.AppointmentId && a.CustomerId == userId);
            if (!ownsAppointment)
                return BadRequest(ApiResponse<ReviewDto>.Fail("Appointment not found for this customer."));
        }

        var review = new Review
        {
            CustomerId = userId,
            AppointmentId = dto.AppointmentId,
            Rating = dto.Rating,
            Comment = string.IsNullOrWhiteSpace(dto.Comment) ? null : dto.Comment.Trim(),
            ServiceName = string.IsNullOrWhiteSpace(dto.ServiceName) ? null : dto.ServiceName.Trim(),
            CreatedAt = DateTime.UtcNow
        };

        db.Reviews.Add(review);
        await db.SaveChangesAsync();

        var saved = await db.Reviews.AsNoTracking().Include(r => r.Customer).FirstAsync(r => r.Id == review.Id);
        return StatusCode(StatusCodes.Status201Created,
            ApiResponse<ReviewDto>.Ok(Map(saved), "Review submitted."));
    }

    private int GetUserId() => int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);

    private static ReviewDto Map(Review r) => new()
    {
        Id = r.Id,
        CustomerId = r.CustomerId,
        CustomerName = r.Customer.FullName,
        AppointmentId = r.AppointmentId,
        Rating = r.Rating,
        Comment = r.Comment,
        ServiceName = r.ServiceName,
        CreatedAt = r.CreatedAt
    };

    private Dictionary<string, string[]> GetModelErrors()
    {
        return ModelState
            .Where(x => x.Value?.Errors.Count > 0)
            .ToDictionary(kvp => kvp.Key, kvp => kvp.Value!.Errors.Select(e => e.ErrorMessage).ToArray());
    }
}
