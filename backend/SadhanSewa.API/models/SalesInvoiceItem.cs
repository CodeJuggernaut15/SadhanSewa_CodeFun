using System.ComponentModel.DataAnnotations.Schema;

namespace SadhanSewa.API.Models
{
    public class SalesInvoiceItem
    {
        public int Id { get; set; }

        // Foreign Keys
        public int SalesInvoiceId { get; set; }

        [ForeignKey("SalesInvoiceId")]
        public SalesInvoice SalesInvoice { get; set; } = null!;

        public int PartId { get; set; }

        [ForeignKey("PartId")]
        public Part Part { get; set; } = null!;

        public int Quantity { get; set; }

        [Column(TypeName = "decimal(10,2)")]
        public decimal UnitPrice { get; set; }

        [Column(TypeName = "decimal(12,2)")]
        public decimal LineTotal => Quantity * UnitPrice;  
    }
}
