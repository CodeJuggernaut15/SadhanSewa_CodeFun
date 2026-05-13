using System.ComponentModel.DataAnnotations;

namespace SadhanSewa.API.DTOs.Service;

public class CreateAppointmentDto
{
    public int? VehicleId { get; set; }

    [Required, MaxLength(200)]
    public string ServiceType { get; set; } = string.Empty;

    [Required]
    public DateTime AppointmentDate { get; set; }

    [Required]
    public TimeSpan AppointmentTime { get; set; }

    [MaxLength(150)]
    public string? MechanicName { get; set; }

    public string? Notes { get; set; }
}

public class AppointmentDto
{
    public int Id { get; set; }
    public int CustomerId { get; set; }
    public string CustomerName { get; set; } = string.Empty;
    public int? VehicleId { get; set; }
    public string VehicleName { get; set; } = string.Empty;
    public string LicensePlate { get; set; } = string.Empty;
    public string ServiceType { get; set; } = string.Empty;
    public DateTime AppointmentDate { get; set; }
    public TimeSpan AppointmentTime { get; set; }
    public string Status { get; set; } = string.Empty;
    public string? MechanicName { get; set; }
    public string? Notes { get; set; }
    public DateTime CreatedAt { get; set; }
}

public class CreatePartRequestDto
{
    [Required, MaxLength(200)]
    public string PartName { get; set; } = string.Empty;

    [MaxLength(100)]
    public string? Category { get; set; }

    public string? Description { get; set; }
}

public class PartRequestDto
{
    public int Id { get; set; }
    public int CustomerId { get; set; }
    public string CustomerName { get; set; } = string.Empty;
    public string PartName { get; set; } = string.Empty;
    public string? Category { get; set; }
    public string? Description { get; set; }
    public string Status { get; set; } = string.Empty;
    public DateTime CreatedAt { get; set; }
}

public class CreateReviewDto
{
    public int? AppointmentId { get; set; }

    [Range(1, 5)]
    public int Rating { get; set; }

    public string? Comment { get; set; }

    [MaxLength(200)]
    public string? ServiceName { get; set; }
}

public class ReviewDto
{
    public int Id { get; set; }
    public int CustomerId { get; set; }
    public string CustomerName { get; set; } = string.Empty;
    public int? AppointmentId { get; set; }
    public int Rating { get; set; }
    public string? Comment { get; set; }
    public string? ServiceName { get; set; }
    public DateTime CreatedAt { get; set; }
}

public class UpdateStatusDto
{
    [Required, MaxLength(30)]
    public string Status { get; set; } = string.Empty;
}
