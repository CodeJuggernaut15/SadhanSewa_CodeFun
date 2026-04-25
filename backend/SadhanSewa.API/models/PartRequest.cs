using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SadhanSewa.API.Models
{
    public class PartRequest
    {
        public int Id { get; set; }

        // Foreign Key
        public int CustomerId { get; set; }

        [ForeignKey("CustomerId")]
        public User Customer { get; set; } = null!;

        [Required, MaxLength(200)]
        public string PartName { get; set; } = string.Empty;

        [MaxLength(100)]
        public string? Category { get; set; }

        public string? Description { get; set; }

        [MaxLength(30)]
        public string Status { get; set; } = "Pending";  // status can be "Pending", "In Progress", "Completed", "Rejected"

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}
