using SadhanSewa.API.DTOs.Part;

namespace SadhanSewa.API.Services.Parts;

/// <summary>
/// Admin CRUD operations for inventory parts.
/// </summary>
public interface IPartsService
{
    Task<List<PartDto>> GetAllAsync();
    Task<PartDto?> GetByIdAsync(int id);
    Task<PartDto> CreateAsync(CreatePartDto dto);
    Task<PartDto?> UpdateAsync(int id, UpdatePartDto dto);
    Task<bool> DeleteAsync(int id);
}
