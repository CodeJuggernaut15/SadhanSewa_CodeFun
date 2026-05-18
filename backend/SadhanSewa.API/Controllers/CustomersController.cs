using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SadhanSewa.API.Data;
using SadhanSewa.API.DTOs;
using SadhanSewa.API.DTOs.Customer;
using SadhanSewa.API.Models;

namespace SadhanSewa.API.Controllers;

/// <summary>
/// Customer registration, search, history, and reports (Staff and Admin only).
/// </summary>
[ApiController]
[Authorize(Roles = "Admin,Staff")]
[Route("api/customers")]
[Tags("Customers")]
public class CustomersController(ApplicationDbContext db) : ControllerBase
{
    private const int CustomerRoleId = 3;

    /// <summary>
    /// Search customers by name, email, phone, ID, or vehicle plate/model. Returns up to 50 results.
    /// </summary>
    [HttpGet]
    [ProducesResponseType(typeof(ApiResponse<List<CustomerSummaryDto>>), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status403Forbidden)]
    public async Task<ActionResult<ApiResponse<List<CustomerSummaryDto>>>> SearchAsync([FromQuery] string? search = null)
    {
        var query = db.Users
            .AsNoTracking()
            .Include(u => u.Vehicles)
            .Include(u => u.Role)
            .Where(u => u.Role.Name == "Customer");

        if (!string.IsNullOrWhiteSpace(search))
        {
            var term = search.Trim().ToLower();
            query = query.Where(u =>
                u.FullName.ToLower().Contains(term) ||
                u.Email.ToLower().Contains(term) ||
                (u.Phone != null && u.Phone.ToLower().Contains(term)) ||
                u.Id.ToString().Contains(term) ||
                u.Vehicles.Any(v =>
                    v.LicensePlate.ToLower().Contains(term) ||
                    v.Model.ToLower().Contains(term)));
        }

        var customers = await query
            .OrderBy(u => u.FullName)
            .Take(50)
            .ToListAsync();

        var data = await MapCustomersAsync(customers);
        return Ok(ApiResponse<List<CustomerSummaryDto>>.Ok(data, "Customers retrieved."));
    }

    /// <summary>
    /// Register a new customer with their first vehicle in one step.
    /// </summary>
    [HttpPost]
    [ProducesResponseType(typeof(ApiResponse<CustomerSummaryDto>), StatusCodes.Status201Created)]
    [ProducesResponseType(typeof(ApiResponse<object>), StatusCodes.Status400BadRequest)]
    [ProducesResponseType(typeof(ApiResponse<object>), StatusCodes.Status409Conflict)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    public async Task<ActionResult<ApiResponse<CustomerSummaryDto>>> CreateAsync([FromBody] CreateCustomerWithVehicleDto dto)
    {
        if (!ModelState.IsValid)
            return BadRequest(ApiResponse<CustomerSummaryDto>.Fail("Validation failed.", GetModelErrors()));

        var email = dto.Email.Trim().ToLowerInvariant();
        var plate = dto.LicensePlate.Trim().ToUpperInvariant();

        if (await db.Users.AnyAsync(u => u.Email.ToLower() == email))
            return Conflict(ApiResponse<CustomerSummaryDto>.Fail("A customer with this email already exists."));

        if (await db.Vehicles.AnyAsync(v => v.LicensePlate.ToUpper() == plate))
            return Conflict(ApiResponse<CustomerSummaryDto>.Fail("A vehicle with this license plate already exists."));

        if (!await db.Roles.AnyAsync(r => r.Id == CustomerRoleId))
            return BadRequest(ApiResponse<CustomerSummaryDto>.Fail("Customer role is not configured."));

        var now = DateTime.UtcNow;
        var customer = new User
        {
            FullName = dto.FullName.Trim(),
            Email = email,
            Phone = dto.Phone.Trim(),
            PasswordHash = BCrypt.Net.BCrypt.HashPassword(dto.Password),
            RoleId = CustomerRoleId,
            IsActive = true,
            CreatedAt = now,
            UpdatedAt = now
        };

        customer.Vehicles.Add(new Vehicle
        {
            Model = dto.VehicleModel.Trim(),
            LicensePlate = plate,
            ManufactureYear = dto.ManufactureYear,
            EngineType = string.IsNullOrWhiteSpace(dto.EngineType) ? null : dto.EngineType.Trim(),
            Mileage = dto.Mileage,
            CreatedAt = now
        });

        db.Users.Add(customer);
        await db.SaveChangesAsync();

        var created = await db.Users
            .AsNoTracking()
            .Include(u => u.Vehicles)
            .FirstAsync(u => u.Id == customer.Id);

        return StatusCode(StatusCodes.Status201Created,
            ApiResponse<CustomerSummaryDto>.Ok((await MapCustomersAsync([created])).Single(), "Customer registered."));
    }

    /// <summary>
    /// Returns the full sales invoice history for a customer.
    /// </summary>
    [HttpGet("{id:int}/history")]
    [ProducesResponseType(typeof(ApiResponse<List<CustomerHistoryItemDto>>), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    public async Task<ActionResult<ApiResponse<List<CustomerHistoryItemDto>>>> GetHistoryAsync(int id)
    {
        var vehicle = await db.Vehicles
            .AsNoTracking()
            .Where(v => v.CustomerId == id)
            .OrderBy(v => v.Id)
            .Select(v => v.Model + " - " + v.LicensePlate)
            .FirstOrDefaultAsync() ?? "No vehicle linked";

        var invoices = await db.SalesInvoices
            .AsNoTracking()
            .Include(i => i.Items)
                .ThenInclude(i => i.Part)
            .Where(i => i.CustomerId == id)
            .OrderByDescending(i => i.CreatedAt)
            .Select(i => new CustomerHistoryItemDto
            {
                Id = i.InvoiceNumber,
                Date = i.CreatedAt,
                Name = i.Items.Count == 1
                    ? i.Items.Select(x => x.Part.Name).First()
                    : i.Items.Count + " parts purchased",
                Vehicle = vehicle,
                Amount = i.TotalAmount,
                Status = i.PaymentStatus,
                Type = "Sale"
            })
            .ToListAsync();

        return Ok(ApiResponse<List<CustomerHistoryItemDto>>.Ok(invoices, "Customer history retrieved."));
    }

    /// <summary>
    /// Returns customer reports: top spenders, most frequent visitors, and overdue credit list.
    /// </summary>
    [HttpGet("reports")]
    [ProducesResponseType(typeof(ApiResponse<CustomerReportDto>), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    public async Task<ActionResult<ApiResponse<CustomerReportDto>>> GetReportsAsync()
    {
        var customers = await db.Users
            .AsNoTracking()
            .Include(u => u.Vehicles)
            .Include(u => u.Role)
            .Where(u => u.Role.Name == "Customer")
            .ToListAsync();

        var summaries = await MapCustomersAsync(customers);
        var pendingInvoices = await db.SalesInvoices
            .AsNoTracking()
            .Include(i => i.Customer)
            .Where(i => i.CustomerId != null && (i.PaymentStatus == "Pending" || i.PaymentStatus == "Overdue"))
            .ToListAsync();

        var overdue = pendingInvoices
            .GroupBy(i => new { i.CustomerId, i.Customer!.FullName, i.Customer.Email })
            .Select(g => new OverdueCreditDto
            {
                CustomerId = g.Key.CustomerId!.Value,
                Name = g.Key.FullName,
                Email = g.Key.Email,
                Amount = g.Sum(i => i.TotalAmount),
                DaysOverdue = g.Min(i => (int)(DateTime.UtcNow - i.CreatedAt).TotalDays),
                Risk = g.Sum(i => i.TotalAmount) >= 10000 ? "High" : "Medium"
            })
            .OrderByDescending(x => x.Amount)
            .ToList();

        var data = new CustomerReportDto
        {
            HighSpenders = summaries.OrderByDescending(c => c.TotalSpent).Take(10).ToList(),
            RegularCustomers = summaries.OrderByDescending(c => c.Visits).Take(10).ToList(),
            OverdueCredit = overdue
        };

        return Ok(ApiResponse<CustomerReportDto>.Ok(data, "Customer reports retrieved."));
    }

    private async Task<List<CustomerSummaryDto>> MapCustomersAsync(List<User> customers)
    {
        var ids = customers.Select(c => c.Id).ToList();
        var invoiceStats = await db.SalesInvoices
            .AsNoTracking()
            .Where(i => i.CustomerId != null && ids.Contains(i.CustomerId.Value))
            .GroupBy(i => i.CustomerId!.Value)
            .Select(g => new { CustomerId = g.Key, Total = g.Sum(i => i.TotalAmount), Visits = g.Count() })
            .ToDictionaryAsync(x => x.CustomerId);

        return customers.Select(c =>
        {
            invoiceStats.TryGetValue(c.Id, out var stats);
            var spent = stats?.Total ?? 0;
            return new CustomerSummaryDto
            {
                Id = c.Id,
                FullName = c.FullName,
                Email = c.Email,
                Phone = c.Phone ?? string.Empty,
                IsActive = c.IsActive,
                TotalSpent = spent,
                Visits = stats?.Visits ?? 0,
                LoyaltyTier = spent >= 100000 ? "Platinum" : spent >= 50000 ? "Gold" : spent >= 10000 ? "Silver" : "Standard",
                Vehicles = c.Vehicles.Select(v => new CustomerVehicleDto
                {
                    Id = v.Id,
                    Model = v.Model,
                    LicensePlate = v.LicensePlate,
                    ManufactureYear = v.ManufactureYear,
                    EngineType = v.EngineType,
                    Mileage = v.Mileage
                }).ToList()
            };
        }).ToList();
    }

    private Dictionary<string, string[]> GetModelErrors()
    {
        return ModelState
            .Where(x => x.Value?.Errors.Count > 0)
            .ToDictionary(
                kvp => kvp.Key,
                kvp => kvp.Value!.Errors.Select(e => e.ErrorMessage).ToArray());
    }
}
