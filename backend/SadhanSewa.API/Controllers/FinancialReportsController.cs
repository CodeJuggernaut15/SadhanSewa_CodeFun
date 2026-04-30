using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SadhanSewa.API.Data;
using SadhanSewa.API.DTOs;
using SadhanSewa.API.Hubs;
using Microsoft.AspNetCore.SignalR;

namespace SadhanSewa.API.Controllers
{
    [ApiController]
    [Authorize(Roles = "Admin")]
    [Route("api/financial-reports")]
    public class FinancialReportsController : ControllerBase
    {
        private readonly ApplicationDbContext _db;
        private readonly IHubContext<NotificationHub> _hubContext;

        public FinancialReportsController(ApplicationDbContext db, IHubContext<NotificationHub> hubContext)
        {
            _db = db;
            _hubContext = hubContext;
        }

        // GET /api/financial-reports?period=daily|monthly|yearly
        [HttpGet]
        public async Task<ActionResult<FinancialReportResponseDto>> GetReport(
            [FromQuery] string period = "monthly",
            [FromQuery] DateTime? startDate = null,
            [FromQuery] DateTime? endDate = null)
        {
            try
            {
                var (from, to) = GetDateRange(period, startDate, endDate);

                var salesInvoices = await _db.SalesInvoices
                    .Where(s => s.CreatedAt >= from && s.CreatedAt <= to)
                    .ToListAsync();

                var purchaseInvoices = await _db.PurchaseInvoices
                    .Where(p => p.CreatedAt >= from && p.CreatedAt <= to)
                    .ToListAsync();

                decimal totalRevenue = salesInvoices
                    .Where(s => s.PaymentStatus == "Paid")
                    .Sum(s => s.TotalAmount);

                decimal totalExpenses = purchaseInvoices.Sum(p => p.TotalAmount);

                decimal outstandingCredit = salesInvoices
                    .Where(s => s.PaymentStatus == "Pending" || s.PaymentStatus == "Overdue")
                    .Sum(s => s.TotalAmount);

                decimal profitMargin = totalRevenue > 0
                    ? Math.Round((totalRevenue - totalExpenses) / totalRevenue * 100, 1)
                    : 0;

                var transactions = new List<TransactionItemDto>();

                foreach (var sale in salesInvoices.OrderByDescending(s => s.CreatedAt))
                {
                    transactions.Add(new TransactionItemDto
                    {
                        Date = sale.CreatedAt.ToString("yyyy-MM-dd"),
                        Type = "Sales Revenue",
                        Amount = $"Rs. {sale.TotalAmount:N0}",
                        Margin = $"{profitMargin}%",
                        Status = sale.PaymentStatus
                    });
                }

                foreach (var purchase in purchaseInvoices.OrderByDescending(p => p.CreatedAt))
                {
                    transactions.Add(new TransactionItemDto
                    {
                        Date = purchase.CreatedAt.ToString("yyyy-MM-dd"),
                        Type = "Parts Procurement",
                        Amount = $"Rs. {purchase.TotalAmount:N0}",
                        Margin = "N/A",
                        Status = purchase.Status.ToString()
                    });
                }

                transactions = transactions.OrderByDescending(t => t.Date).ToList();

                var response = new FinancialReportResponseDto
                {
                    Summary = new FinancialSummaryDto
                    {
                        TotalRevenue = totalRevenue,
                        TotalExpenses = totalExpenses,
                        OutstandingCredit = outstandingCredit,
                        ProfitMargin = profitMargin
                    },
                    Transactions = transactions
                };

                // Real-time Notification
                await _hubContext.Clients.All.SendAsync("ReceiveNotification", 
                    "Financial Insights Ready", 
                    $"The {period} fiscal report has been synthesized successfully.", 
                    "Finance");

                return Ok(response);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Something went wrong.", detail = ex.Message });
            }
        }

        private static (DateTime from, DateTime to) GetDateRange(
            string period, DateTime? startDate, DateTime? endDate)
        {
            if (startDate.HasValue && endDate.HasValue)
                return (startDate.Value.ToUniversalTime(), endDate.Value.Date.AddDays(1).ToUniversalTime());

            var now = DateTime.UtcNow;

            return period.ToLower() switch
            {
                "daily"  => (now.Date.ToUniversalTime(), now.Date.AddDays(1).ToUniversalTime()),
                "yearly" => (new DateTime(now.Year, 1, 1, 0, 0, 0, DateTimeKind.Utc),
                             new DateTime(now.Year + 1, 1, 1, 0, 0, 0, DateTimeKind.Utc)),
                _        => (new DateTime(now.Year, now.Month, 1, 0, 0, 0, DateTimeKind.Utc),
                             new DateTime(now.Year, now.Month, 1, 0, 0, 0, DateTimeKind.Utc).AddMonths(1))
            };
        }
    }
}
