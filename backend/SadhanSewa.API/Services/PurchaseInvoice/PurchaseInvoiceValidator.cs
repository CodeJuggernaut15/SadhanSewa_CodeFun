using SadhanSewa.API.DTOs.PurchaseInvoice;

namespace SadhanSewa.API.Services.PurchaseInvoice;

/// <summary>
/// Provides manual validation for purchase invoice requests.
/// </summary>
public static class PurchaseInvoiceValidator
{
    /// <summary>
    /// Validates create invoice input data.
    /// </summary>
    public static Dictionary<string, string[]>? ValidateCreate(CreatePurchaseInvoiceDto dto)
    {
        var errors = new Dictionary<string, List<string>>();
        if (dto.VendorId <= 0) AddError(errors, nameof(dto.VendorId), "VendorId must be greater than zero.");
        if (dto.ExpectedIntakeDate.Date < DateTime.UtcNow.Date)
            AddError(errors, nameof(dto.ExpectedIntakeDate), "ExpectedIntakeDate cannot be in the past.");
        if (dto.LineItems.Count == 0) AddError(errors, nameof(dto.LineItems), "At least one line item is required.");

        for (var i = 0; i < dto.LineItems.Count; i++)
        {
            var item = dto.LineItems[i];
            var prefix = $"{nameof(dto.LineItems)}[{i}]";
            if (string.IsNullOrWhiteSpace(item.ComponentName))
                AddError(errors, $"{prefix}.{nameof(item.ComponentName)}", "ComponentName is required.");
            if (item.Volume <= 0) AddError(errors, $"{prefix}.{nameof(item.Volume)}", "Volume must be greater than zero.");
            if (item.UnitCost <= 0) AddError(errors, $"{prefix}.{nameof(item.UnitCost)}", "UnitCost must be greater than zero.");
        }

        return ToDictionary(errors);
    }

    /// <summary>
    /// Validates create line item input data.
    /// </summary>
    public static Dictionary<string, string[]>? ValidateLineItem(CreateLineItemDto dto)
    {
        var errors = new Dictionary<string, List<string>>();
        if (string.IsNullOrWhiteSpace(dto.ComponentName))
            AddError(errors, nameof(dto.ComponentName), "ComponentName is required.");
        if (dto.Volume <= 0) AddError(errors, nameof(dto.Volume), "Volume must be greater than zero.");
        if (dto.UnitCost <= 0) AddError(errors, nameof(dto.UnitCost), "UnitCost must be greater than zero.");
        return ToDictionary(errors);
    }

    private static void AddError(Dictionary<string, List<string>> errors, string key, string message)
    {
        if (!errors.TryGetValue(key, out var values))
        {
            values = new List<string>();
            errors[key] = values;
        }

        values.Add(message);
    }

    private static Dictionary<string, string[]>? ToDictionary(Dictionary<string, List<string>> errors)
    {
        return errors.Count == 0 ? null : errors.ToDictionary(kvp => kvp.Key, kvp => kvp.Value.ToArray());
    }
}
