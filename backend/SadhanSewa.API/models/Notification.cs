using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SadhanSewa.API.Models
{
    public class Notification
    {
        public int Id { get; set; }

        [Required, MaxLength(50)]
        public string Type { get; set; } = string.Empty;   // "LowStock", "CreditReminder", "AIDiagnostic"

        [Required, MaxLength(200)]
        public string Title { get; set; } = string.Empty;

        public string? Message { get; set; }

        // Foreign Key to User (who receives the notification)
        public int? UserId { get; set; }

        [ForeignKey("UserId")]
        public User? User { get; set; }

        public int? RelatedId { get; set; }    // PartId for low stock, InvoiceId for credit

        public bool IsRead { get; set; } = false;

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}
