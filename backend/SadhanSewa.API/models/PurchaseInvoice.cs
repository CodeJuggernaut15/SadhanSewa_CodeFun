using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SadhanSewa.API.Models
{
    /// <summary>
    /// Represents the lifecycle state for a purchase invoice.
    /// </summary>
    public enum PurchaseInvoiceStatus
    {
        Draft = 0,
        Finalized = 1
    }

    /// <summary>
    /// Represents a purchase invoice created against a vendor.
    /// </summary>
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

        [Required, MaxLength(20)]
        public string SessionCode { get; set; } = string.Empty;

        public DateTime ExpectedIntakeDate { get; set; }

        [MaxLength(20)]
        public PurchaseInvoiceStatus Status { get; set; } = PurchaseInvoiceStatus.Draft;

        public string? Notes { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime? UpdatedAt { get; set; }

        // Navigation
        public ICollection<PurchaseInvoiceItem> Items { get; set; } = new List<PurchaseInvoiceItem>();
    }
}
