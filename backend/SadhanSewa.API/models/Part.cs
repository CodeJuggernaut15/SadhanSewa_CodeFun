using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SadhanSewa.API.Models
{
    public class Part
    {
        public int Id { get; set; }

        [Required, MaxLength(200)]
        public string Name { get; set; } = string.Empty;

        [Required, MaxLength(50)]
        public string SKU { get; set; } = string.Empty;

        [MaxLength(100)]
        public string? Category { get; set; }        // "Maintenance", "Braking", "Engine"

        [Column(TypeName = "decimal(10,2)")]
        public decimal Price { get; set; }

        public int Stock { get; set; } = 0;

        public int LowStockThreshold { get; set; } = 10;   // Lowstock alert threshold

        // Foreign Key
        public int? VendorId { get; set; }

        [ForeignKey("VendorId")]
        public Vendor? Vendor { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
    }
}
