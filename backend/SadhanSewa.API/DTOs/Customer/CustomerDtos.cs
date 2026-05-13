using System.ComponentModel.DataAnnotations;

namespace SadhanSewa.API.DTOs.Customer;

public class CreateCustomerWithVehicleDto
{
    [Required, MinLength(3), MaxLength(150)]
    public string FullName { get; set; } = string.Empty;

    [Required, EmailAddress, MaxLength(200)]
    public string Email { get; set; } = string.Empty;

    [Required, MaxLength(20)]
    public string Phone { get; set; } = string.Empty;

    [Required, MinLength(8), MaxLength(100)]
    public string Password { get; set; } = string.Empty;

    [Required, MaxLength(150)]
    public string VehicleModel { get; set; } = string.Empty;

    [Required, MaxLength(50)]
    public string LicensePlate { get; set; } = string.Empty;

    public int? ManufactureYear { get; set; }

    [MaxLength(50)]
    public string? EngineType { get; set; }

    [Range(0, int.MaxValue)]
    public int Mileage { get; set; }
}

public class CustomerVehicleDto
{
    public int Id { get; set; }
    public string Model { get; set; } = string.Empty;
    public string LicensePlate { get; set; } = string.Empty;
    public int? ManufactureYear { get; set; }
    public string? EngineType { get; set; }
    public int Mileage { get; set; }
}

public class CustomerSummaryDto
{
    public int Id { get; set; }
    public string FullName { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string Phone { get; set; } = string.Empty;
    public bool IsActive { get; set; }
    public decimal TotalSpent { get; set; }
    public int Visits { get; set; }
    public string LoyaltyTier { get; set; } = "Standard";
    public List<CustomerVehicleDto> Vehicles { get; set; } = [];
}

public class CustomerHistoryItemDto
{
    public string Id { get; set; } = string.Empty;
    public DateTime Date { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Vehicle { get; set; } = string.Empty;
    public decimal Amount { get; set; }
    public string Status { get; set; } = string.Empty;
    public string Type { get; set; } = "Sale";
}

public class CustomerReportDto
{
    public List<CustomerSummaryDto> HighSpenders { get; set; } = [];
    public List<CustomerSummaryDto> RegularCustomers { get; set; } = [];
    public List<OverdueCreditDto> OverdueCredit { get; set; } = [];
}

public class OverdueCreditDto
{
    public int CustomerId { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public decimal Amount { get; set; }
    public int DaysOverdue { get; set; }
    public string Risk { get; set; } = "Medium";
}
