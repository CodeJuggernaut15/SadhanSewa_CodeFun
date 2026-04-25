using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SadhanSewa.API.Models
{
    public class Appointment
    {
        public int Id { get; set; }

        // Foreign Keys
        public int CustomerId { get; set; }

        [ForeignKey("CustomerId")]
        public User Customer { get; set; } = null!;

        public int? VehicleId { get; set; }

        [ForeignKey("VehicleId")]
        public Vehicle? Vehicle { get; set; }

        [Required, MaxLength(200)]
        public string ServiceType { get; set; } = string.Empty;  // "Full Engine Service"

        public DateTime AppointmentDate { get; set; }

        public TimeSpan AppointmentTime { get; set; }

        [MaxLength(20)]
        public string Status { get; set; } = "Pending";  // "Pending", "Confirmed", "Cancelled", "Completed"

        [MaxLength(150)]
        public string? MechanicName { get; set; }

        public string? Notes { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}
