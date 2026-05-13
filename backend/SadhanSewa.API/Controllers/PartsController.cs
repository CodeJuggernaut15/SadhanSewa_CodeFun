using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SadhanSewa.API.DTOs;
using SadhanSewa.API.DTOs.Part;
using SadhanSewa.API.Services.Parts;

namespace SadhanSewa.API.Controllers;

/// <summary>
/// Admin CRUD for inventory parts.
/// </summary>
[ApiController]
[Authorize(Roles = "Admin,Staff")]
[Route("api/parts")]
public class PartsController(IPartsService partsService) : ControllerBase
{
    /// <summary>
    /// Returns all parts.
    /// </summary>
    [HttpGet]
    public async Task<ActionResult<ApiResponse<List<PartDto>>>> GetAllAsync()
    {
        var data = await partsService.GetAllAsync();
        return Ok(ApiResponse<List<PartDto>>.Ok(data, "Parts retrieved."));
    }

    /// <summary>
    /// Returns a single part by id.
    /// </summary>
    [HttpGet("{id:int}")]
    public async Task<ActionResult<ApiResponse<PartDto>>> GetByIdAsync(int id)
    {
        var data = await partsService.GetByIdAsync(id);
        if (data is null) return NotFound(ApiResponse<PartDto>.Fail("Part not found."));
        return Ok(ApiResponse<PartDto>.Ok(data, "Part retrieved."));
    }

    /// <summary>
    /// Creates a new part.
    /// </summary>
    [HttpPost]
    [Authorize(Roles = "Admin")]
    public async Task<ActionResult<ApiResponse<PartDto>>> CreateAsync([FromBody] CreatePartDto dto)
    {
        if (!ModelState.IsValid)
            return BadRequest(ApiResponse<PartDto>.Fail("Validation failed.", GetModelErrors()));

        try
        {
            var data = await partsService.CreateAsync(dto);
            return StatusCode(StatusCodes.Status201Created,
                ApiResponse<PartDto>.Ok(data, "Part created."));
        }
        catch (InvalidOperationException ex)
        {
            return Conflict(ApiResponse<PartDto>.Fail(ex.Message));
        }
    }

    /// <summary>
    /// Updates an existing part.
    /// </summary>
    [HttpPut("{id:int}")]
    [Authorize(Roles = "Admin")]
    public async Task<ActionResult<ApiResponse<PartDto>>> UpdateAsync(int id, [FromBody] UpdatePartDto dto)
    {
        if (!ModelState.IsValid)
            return BadRequest(ApiResponse<PartDto>.Fail("Validation failed.", GetModelErrors()));

        try
        {
            var data = await partsService.UpdateAsync(id, dto);
            if (data is null) return NotFound(ApiResponse<PartDto>.Fail("Part not found."));
            return Ok(ApiResponse<PartDto>.Ok(data, "Part updated."));
        }
        catch (InvalidOperationException ex)
        {
            return Conflict(ApiResponse<PartDto>.Fail(ex.Message));
        }
    }

    /// <summary>
    /// Deletes a part when it is not referenced on invoices.
    /// </summary>
    [HttpDelete("{id:int}")]
    [Authorize(Roles = "Admin")]
    public async Task<ActionResult<ApiResponse<string>>> DeleteAsync(int id)
    {
        try
        {
            var ok = await partsService.DeleteAsync(id);
            if (!ok) return NotFound(ApiResponse<string>.Fail("Part not found."));
            return Ok(ApiResponse<string>.Ok("deleted", "Part deleted."));
        }
        catch (InvalidOperationException ex)
        {
            return Conflict(ApiResponse<string>.Fail(ex.Message));
        }
    }

    private Dictionary<string, string[]> GetModelErrors()
    {
        return ModelState
            .Where(x => x.Value?.Errors.Count > 0)
            .ToDictionary(
                kvp => kvp.Key,
                kvp => kvp.Value!.Errors.Select(e => e.ErrorMessage).ToArray());
    }
}
