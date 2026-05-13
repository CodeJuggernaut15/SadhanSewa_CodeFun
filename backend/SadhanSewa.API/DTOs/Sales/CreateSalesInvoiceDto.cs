using System.ComponentModel.DataAnnotations;

namespace SadhanSewa.API.DTOs.Sales;

public class CreateSalesInvoiceDto
{
    public int? CustomerId { get; set; }

    [Required, MaxLength(20)]
    public string PaymentMethod { get; set; } = "Cash";

    [Required, MaxLength(20)]
    public string PaymentStatus { get; set; } = "Paid";

    public bool EmailSent { get; set; }

    [Required, MinLength(1)]
    public List<CreateSalesInvoiceItemDto> Items { get; set; } = [];
}

public class CreateSalesInvoiceItemDto
{
    [Range(1, int.MaxValue)]
    public int PartId { get; set; }

    [Range(1, int.MaxValue)]
    public int Quantity { get; set; }
}

public class SalesInvoiceDto
{
    public int Id { get; set; }
    public string InvoiceNumber { get; set; } = string.Empty;
    public int? CustomerId { get; set; }
    public string CustomerName { get; set; } = "Walk-in";
    public decimal Subtotal { get; set; }
    public decimal DiscountPct { get; set; }
    public decimal DiscountAmount { get; set; }
    public decimal TotalAmount { get; set; }
    public string PaymentMethod { get; set; } = string.Empty;
    public string PaymentStatus { get; set; } = string.Empty;
    public bool EmailSent { get; set; }
    public DateTime CreatedAt { get; set; }
    public List<SalesInvoiceItemDto> Items { get; set; } = [];
}

public class SalesInvoiceItemDto
{
    public int PartId { get; set; }
    public string PartName { get; set; } = string.Empty;
    public string SKU { get; set; } = string.Empty;
    public int Quantity { get; set; }
    public decimal UnitPrice { get; set; }
    public decimal LineTotal { get; set; }
}
