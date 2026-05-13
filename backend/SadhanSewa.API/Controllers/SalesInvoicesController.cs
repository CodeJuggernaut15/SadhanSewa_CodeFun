using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SadhanSewa.API.Data;
using SadhanSewa.API.DTOs;
using SadhanSewa.API.DTOs.Sales;
using SadhanSewa.API.Models;

namespace SadhanSewa.API.Controllers;

[ApiController]
[Authorize(Roles = "Admin,Staff")]
[Route("api/sales-invoices")]
public class SalesInvoicesController(ApplicationDbContext db) : ControllerBase
{
    [HttpPost]
    public async Task<ActionResult<ApiResponse<SalesInvoiceDto>>> CreateAsync([FromBody] CreateSalesInvoiceDto dto)
    {
        if (!ModelState.IsValid)
            return BadRequest(ApiResponse<SalesInvoiceDto>.Fail("Validation failed.", GetModelErrors()));

        var createdById = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
        var partIds = dto.Items.Select(i => i.PartId).Distinct().ToList();
        var parts = await db.Parts.Where(p => partIds.Contains(p.Id)).ToDictionaryAsync(p => p.Id);

        foreach (var item in dto.Items)
        {
            if (!parts.TryGetValue(item.PartId, out var part))
                return BadRequest(ApiResponse<SalesInvoiceDto>.Fail($"Part {item.PartId} was not found."));
            if (part.Stock < item.Quantity)
                return BadRequest(ApiResponse<SalesInvoiceDto>.Fail($"{part.Name} has only {part.Stock} units in stock."));
        }

        if (dto.CustomerId is not null && !await db.Users.AnyAsync(u => u.Id == dto.CustomerId))
            return BadRequest(ApiResponse<SalesInvoiceDto>.Fail("Customer not found."));

        var subtotal = dto.Items.Sum(i => parts[i.PartId].Price * i.Quantity);
        var discountPct = subtotal > 5000 ? 10m : 0m;
        var discountAmount = subtotal * discountPct / 100m;
        var now = DateTime.UtcNow;

        var invoice = new SalesInvoice
        {
            InvoiceNumber = $"SI-{now:yyyyMMddHHmmss}",
            CustomerId = dto.CustomerId,
            CreatedById = createdById,
            Subtotal = subtotal,
            DiscountPct = discountPct,
            DiscountAmount = discountAmount,
            TotalAmount = subtotal - discountAmount,
            PaymentMethod = dto.PaymentMethod.Trim(),
            PaymentStatus = dto.PaymentStatus.Trim(),
            EmailSent = dto.EmailSent,
            CreatedAt = now
        };

        foreach (var item in dto.Items)
        {
            var part = parts[item.PartId];
            part.Stock -= item.Quantity;
            part.UpdatedAt = now;
            invoice.Items.Add(new SalesInvoiceItem
            {
                PartId = item.PartId,
                Quantity = item.Quantity,
                UnitPrice = part.Price
            });
        }

        db.SalesInvoices.Add(invoice);
        await db.SaveChangesAsync();

        var saved = await db.SalesInvoices
            .AsNoTracking()
            .Include(i => i.Customer)
            .Include(i => i.Items)
                .ThenInclude(i => i.Part)
            .FirstAsync(i => i.Id == invoice.Id);

        return StatusCode(StatusCodes.Status201Created,
            ApiResponse<SalesInvoiceDto>.Ok(Map(saved), "Sales invoice created."));
    }

    private static SalesInvoiceDto Map(SalesInvoice invoice)
    {
        return new SalesInvoiceDto
        {
            Id = invoice.Id,
            InvoiceNumber = invoice.InvoiceNumber,
            CustomerId = invoice.CustomerId,
            CustomerName = invoice.Customer?.FullName ?? "Walk-in",
            Subtotal = invoice.Subtotal,
            DiscountPct = invoice.DiscountPct,
            DiscountAmount = invoice.DiscountAmount,
            TotalAmount = invoice.TotalAmount,
            PaymentMethod = invoice.PaymentMethod,
            PaymentStatus = invoice.PaymentStatus,
            EmailSent = invoice.EmailSent,
            CreatedAt = invoice.CreatedAt,
            Items = invoice.Items.Select(i => new SalesInvoiceItemDto
            {
                PartId = i.PartId,
                PartName = i.Part.Name,
                SKU = i.Part.SKU,
                Quantity = i.Quantity,
                UnitPrice = i.UnitPrice,
                LineTotal = i.Quantity * i.UnitPrice
            }).ToList()
        };
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
