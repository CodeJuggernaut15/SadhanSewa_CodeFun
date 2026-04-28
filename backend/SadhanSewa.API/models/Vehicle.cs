using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SadhanSewa.API.Models
{
    public class Vehicle
    {
        public int Id { get; set; }

        // Foreign Key
        public int CustomerId { get; set; }

        [ForeignKey("CustomerId")]
        public User Customer { get; set; } = null!;

        [Required, MaxLength(150)]
        public string Model { get; set; } = string.Empty;       // vehichle model, for example "TATA NEXON"

        [Required, MaxLength(50)]
        public string LicensePlate { get; set; } = string.Empty; // Number plate of the vehicle

        public int? ManufactureYear { get; set; }

        [MaxLength(50)]
        public string? EngineType { get; set; }                  // whether it's petrol, diesel, electric, or hybrid

        public int Mileage { get; set; } = 0;

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}
