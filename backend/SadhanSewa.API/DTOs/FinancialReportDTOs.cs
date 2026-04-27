namespace SadhanSewa.API.DTOs
{
    public class FinancialSummaryDto
    {
        public decimal TotalRevenue { get; set; }
        public decimal TotalExpenses { get; set; }
        public decimal OutstandingCredit { get; set; }
        public decimal ProfitMargin { get; set; }
    }

    public class TransactionItemDto
    {
        public string Date { get; set; } = string.Empty;
        public string Type { get; set; } = string.Empty;
        public string Amount { get; set; } = string.Empty;
        public string Margin { get; set; } = string.Empty;
        public string Status { get; set; } = string.Empty;
    }

    public class FinancialReportResponseDto
    {
        public FinancialSummaryDto Summary { get; set; } = new();
        public List<TransactionItemDto> Transactions { get; set; } = new();
    }
}
