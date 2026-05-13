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
[Route("api/appointments")]
public class AppointmentsController(ApplicationDbContext db) : ControllerBase
{
    [HttpGet]
    public async Task<ActionResult<ApiResponse<List<AppointmentDto>>>> GetAllAsync()
    {
        var userId = GetUserId();
        var isCustomer = User.IsInRole("Customer");

        var query = db.Appointments
            .AsNoTracking()
            .Include(a => a.Customer)
            .Include(a => a.Vehicle)
            .AsQueryable();

        if (isCustomer)
            query = query.Where(a => a.CustomerId == userId);

        var appointments = await query
            .OrderByDescending(a => a.AppointmentDate)
            .ThenByDescending(a => a.AppointmentTime)
            .ToListAsync();

        var data = appointments.Select(Map).ToList();

        return Ok(ApiResponse<List<AppointmentDto>>.Ok(data, "Appointments retrieved."));
    }

    [HttpPost]
    [Authorize(Roles = "Customer,Admin,Staff")]
    public async Task<ActionResult<ApiResponse<AppointmentDto>>> CreateAsync([FromBody] CreateAppointmentDto dto)
    {
        if (!ModelState.IsValid)
            return BadRequest(ApiResponse<AppointmentDto>.Fail("Validation failed.", GetModelErrors()));

        var customerId = GetUserId();

        if (!User.IsInRole("Customer") && dto.VehicleId is null)
            return BadRequest(ApiResponse<AppointmentDto>.Fail("Vehicle is required."));

        if (dto.VehicleId is not null)
        {
            var ownsVehicle = await db.Vehicles.AnyAsync(v => v.Id == dto.VehicleId && v.CustomerId == customerId);
            if (User.IsInRole("Customer") && !ownsVehicle)
                return BadRequest(ApiResponse<AppointmentDto>.Fail("Vehicle not found for this customer."));
        }

        var appointment = new Appointment
        {
            CustomerId = customerId,
            VehicleId = dto.VehicleId,
            ServiceType = dto.ServiceType.Trim(),
            AppointmentDate = DateTime.SpecifyKind(dto.AppointmentDate.Date, DateTimeKind.Utc),
            AppointmentTime = dto.AppointmentTime,
            MechanicName = string.IsNullOrWhiteSpace(dto.MechanicName) ? null : dto.MechanicName.Trim(),
            Notes = string.IsNullOrWhiteSpace(dto.Notes) ? null : dto.Notes.Trim(),
            Status = "Pending",
            CreatedAt = DateTime.UtcNow
        };

        db.Appointments.Add(appointment);
        await db.SaveChangesAsync();

        var saved = await db.Appointments
            .AsNoTracking()
            .Include(a => a.Customer)
            .Include(a => a.Vehicle)
            .FirstAsync(a => a.Id == appointment.Id);

        return StatusCode(StatusCodes.Status201Created,
            ApiResponse<AppointmentDto>.Ok(Map(saved), "Appointment booked."));
    }

    [HttpPut("{id:int}/status")]
    [Authorize(Roles = "Admin,Staff")]
    public async Task<ActionResult<ApiResponse<AppointmentDto>>> UpdateStatusAsync(int id, [FromBody] UpdateStatusDto dto)
    {
        var allowed = new[] { "Pending", "Confirmed", "Cancelled", "Completed" };
        if (!allowed.Contains(dto.Status))
            return BadRequest(ApiResponse<AppointmentDto>.Fail("Invalid appointment status."));

        var appointment = await db.Appointments
            .Include(a => a.Customer)
            .Include(a => a.Vehicle)
            .FirstOrDefaultAsync(a => a.Id == id);

        if (appointment is null)
            return NotFound(ApiResponse<AppointmentDto>.Fail("Appointment not found."));

        appointment.Status = dto.Status;
        await db.SaveChangesAsync();

        return Ok(ApiResponse<AppointmentDto>.Ok(Map(appointment), "Appointment status updated."));
    }

    private int GetUserId() => int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);

    private static AppointmentDto Map(Appointment a) => new()
    {
        Id = a.Id,
        CustomerId = a.CustomerId,
        CustomerName = a.Customer.FullName,
        VehicleId = a.VehicleId,
        VehicleName = a.Vehicle?.Model ?? string.Empty,
        LicensePlate = a.Vehicle?.LicensePlate ?? string.Empty,
        ServiceType = a.ServiceType,
        AppointmentDate = a.AppointmentDate,
        AppointmentTime = a.AppointmentTime,
        Status = a.Status,
        MechanicName = a.MechanicName,
        Notes = a.Notes,
        CreatedAt = a.CreatedAt
    };

    private Dictionary<string, string[]> GetModelErrors()
    {
        return ModelState
            .Where(x => x.Value?.Errors.Count > 0)
            .ToDictionary(kvp => kvp.Key, kvp => kvp.Value!.Errors.Select(e => e.ErrorMessage).ToArray());
    }
}
