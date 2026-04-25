using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SadhanSewa.API.Models
{
    public class PurchaseInvoice
    {
        public int Id { get; set; }

        // Foreign Keys
        public int VendorId { get; set; }

        [ForeignKey("VendorId")]
        public Vendor Vendor { get; set; } = null!;

        public int CreatedById { get; set; }

        [ForeignKey("CreatedById")]
        public User CreatedBy { get; set; } = null!;

        [Column(TypeName = "decimal(12,2)")]
        public decimal TotalAmount { get; set; } = 0;

        [MaxLength(20)]
        public string Status { get; set; } = "Completed";

        public string? Notes { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        // Navigation
        public ICollection<PurchaseInvoiceItem> Items { get; set; } = new List<PurchaseInvoiceItem>();
    }
}
