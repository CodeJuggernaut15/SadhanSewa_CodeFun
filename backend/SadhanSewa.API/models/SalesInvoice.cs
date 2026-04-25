using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SadhanSewa.API.Models
{
    public class SalesInvoice
    {
        public int Id { get; set; }

        [Required, MaxLength(50)]
        public string InvoiceNumber { get; set; } = string.Empty; 

        // Foreign Keys
        public int? CustomerId { get; set; }

        [ForeignKey("CustomerId")]
        public User? Customer { get; set; }

        public int CreatedById { get; set; }

        [ForeignKey("CreatedById")]
        public User CreatedBy { get; set; } = null!;

        [Column(TypeName = "decimal(12,2)")]
        public decimal Subtotal { get; set; } = 0;

        [Column(TypeName = "decimal(5,2)")]
        public decimal DiscountPct { get; set; } = 0;       // it is declared as percentage, for example 10 means 10% discount

        [Column(TypeName = "decimal(12,2)")]
        public decimal DiscountAmount { get; set; } = 0;

        [Column(TypeName = "decimal(12,2)")]
        public decimal TotalAmount { get; set; } = 0;

        [MaxLength(20)]
        public string PaymentMethod { get; set; } = "Cash";    // "Cash", "Digital", "Credit"

        [MaxLength(20)]
        public string PaymentStatus { get; set; } = "Paid";    // "Paid", "Pending", "Overdue"

        public bool EmailSent { get; set; } = false;           // this will be true if the invoice has been emailed to the customer

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        // Navigation
        public ICollection<SalesInvoiceItem> Items { get; set; } = new List<SalesInvoiceItem>();
    }
}
