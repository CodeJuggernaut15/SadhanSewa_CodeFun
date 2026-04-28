namespace SadhanSewa.API.DTOs;

/// <summary>
/// Standard API response wrapper.
/// </summary>
/// <typeparam name="T">Response payload type.</typeparam>
public class ApiResponse<T>
{
    public bool Success { get; set; }
    public string Message { get; set; } = string.Empty;
    public T? Data { get; set; }
    public Dictionary<string, string[]>? Errors { get; set; }

    /// <summary>
    /// Creates a successful response.
    /// </summary>
    /// <param name="data">Response data.</param>
    /// <param name="message">Human-readable message.</param>
    /// <returns>A success response wrapper.</returns>
    public static ApiResponse<T> Ok(T? data, string message = "Success")
    {
        return new ApiResponse<T>
        {
            Success = true,
            Message = message,
            Data = data
        };
    }

    /// <summary>
    /// Creates a failed response.
    /// </summary>
    /// <param name="message">Failure message.</param>
    /// <param name="errors">Validation or domain errors.</param>
    /// <returns>A failed response wrapper.</returns>
    public static ApiResponse<T> Fail(string message, Dictionary<string, string[]>? errors = null)
    {
        return new ApiResponse<T>
        {
            Success = false,
            Message = message,
            Errors = errors
        };
    }
}
