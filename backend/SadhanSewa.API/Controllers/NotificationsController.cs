using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using SadhanSewa.API.Data;
using SadhanSewa.API.DTOs;
using SadhanSewa.API.DTOs.Notification;
using SadhanSewa.API.Hubs;
using SadhanSewa.API.Models;

namespace SadhanSewa.API.Controllers;

[ApiController]
[Authorize]
[Route("api/notifications")]
public class NotificationsController(ApplicationDbContext db, IHubContext<NotificationHub> hub) : ControllerBase
{
    [HttpGet]
    public async Task<ActionResult<ApiResponse<List<NotificationDto>>>> GetAllAsync()
    {
        var userId = GetUserId();
        var query = db.Notifications.AsNoTracking().AsQueryable();

        if (User.IsInRole("Customer"))
            query = query.Where(n => n.UserId == userId || n.UserId == null);

        var notifications = await query
            .OrderByDescending(n => n.CreatedAt)
            .Take(100)
            .ToListAsync();

        var data = notifications.Select(Map).ToList();

        return Ok(ApiResponse<List<NotificationDto>>.Ok(data, "Notifications retrieved."));
    }

    [HttpPut("{id:int}/read")]
    public async Task<ActionResult<ApiResponse<NotificationDto>>> MarkReadAsync(int id)
    {
        var userId = GetUserId();
        var notification = await db.Notifications.FirstOrDefaultAsync(n => n.Id == id);
        if (notification is null)
            return NotFound(ApiResponse<NotificationDto>.Fail("Notification not found."));

        if (User.IsInRole("Customer") && notification.UserId != userId && notification.UserId != null)
            return Forbid();

        notification.IsRead = true;
        await db.SaveChangesAsync();

        return Ok(ApiResponse<NotificationDto>.Ok(Map(notification), "Notification marked as read."));
    }

    [HttpPut("read-all")]
    public async Task<ActionResult<ApiResponse<int>>> MarkAllReadAsync()
    {
        var userId = GetUserId();
        var query = db.Notifications.AsQueryable();

        if (User.IsInRole("Customer"))
            query = query.Where(n => n.UserId == userId || n.UserId == null);

        var list = await query.Where(n => !n.IsRead).ToListAsync();
        foreach (var item in list)
            item.IsRead = true;

        await db.SaveChangesAsync();
        return Ok(ApiResponse<int>.Ok(list.Count, "Notifications marked as read."));
    }

    [HttpPost("sync")]
    [Authorize(Roles = "Admin,Staff")]
    public async Task<ActionResult<ApiResponse<int>>> SyncSystemNotificationsAsync()
    {
        var created = 0;
        var now = DateTime.UtcNow;

        var lowStockParts = await db.Parts
            .AsNoTracking()
            .Where(p => p.Stock < p.LowStockThreshold)
            .ToListAsync();

        foreach (var part in lowStockParts)
        {
            var exists = await db.Notifications.AnyAsync(n =>
                n.Type == "LowStock" && n.RelatedId == part.Id && !n.IsRead);

            if (exists) continue;

            db.Notifications.Add(new Notification
            {
                Type = "LowStock",
                Title = "Low stock alert",
                Message = $"{part.Name} has only {part.Stock} units left.",
                RelatedId = part.Id,
                CreatedAt = now
            });
            created++;
        }

        var overdueInvoices = await db.SalesInvoices
            .AsNoTracking()
            .Include(i => i.Customer)
            .Where(i => i.CustomerId != null && i.PaymentStatus != "Paid" && i.CreatedAt <= now.AddDays(-30))
            .ToListAsync();

        foreach (var invoice in overdueInvoices)
        {
            var exists = await db.Notifications.AnyAsync(n =>
                n.Type == "CreditReminder" && n.RelatedId == invoice.Id && !n.IsRead);

            if (exists) continue;

            db.Notifications.Add(new Notification
            {
                Type = "CreditReminder",
                Title = "Credit payment reminder",
                Message = $"{invoice.Customer!.FullName} has unpaid credit of Rs. {invoice.TotalAmount}.",
                UserId = invoice.CustomerId,
                RelatedId = invoice.Id,
                CreatedAt = now
            });
            created++;
        }

        await db.SaveChangesAsync();

        if (created > 0)
            await hub.Clients.All.SendAsync("ReceiveNotification", "Notifications updated", $"{created} new notification(s) created.", "System");

        return Ok(ApiResponse<int>.Ok(created, "Notification sync completed."));
    }

    private int GetUserId() => int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);

    private static NotificationDto Map(Notification n) => new()
    {
        Id = n.Id,
        Type = n.Type,
        Title = n.Title,
        Message = n.Message,
        UserId = n.UserId,
        RelatedId = n.RelatedId,
        IsRead = n.IsRead,
        CreatedAt = n.CreatedAt
    };
}
