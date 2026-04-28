using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SadhanSewa.API.Models
{
    public class Review
    {
        public int Id { get; set; }

        // Foreign Keys
        public int CustomerId { get; set; }

        [ForeignKey("CustomerId")]
        public User Customer { get; set; } = null!;

        public int? AppointmentId { get; set; }

        [ForeignKey("AppointmentId")]
        public Appointment? Appointment { get; set; }

        [Range(1, 5)]
        public int Rating { get; set; }

        public string? Comment { get; set; }

        [MaxLength(200)]
        public string? ServiceName { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}
