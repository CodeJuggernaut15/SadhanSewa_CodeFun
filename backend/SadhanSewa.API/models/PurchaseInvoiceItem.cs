using System.ComponentModel.DataAnnotations.Schema;

namespace SadhanSewa.API.Models
{
    public class PurchaseInvoiceItem
    {
        public int Id { get; set; }

        // Foreign Keys
        public int PurchaseInvoiceId { get; set; }

        [ForeignKey("PurchaseInvoiceId")]
        public PurchaseInvoice PurchaseInvoice { get; set; } = null!;

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
