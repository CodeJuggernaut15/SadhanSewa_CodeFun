using System.Text.Json;
using Npgsql;

namespace SadhanSewa.API.Middleware;

/// <summary>
/// Translates unhandled exceptions into problem details responses.
/// </summary>
public class ExceptionHandlingMiddleware(
    RequestDelegate next,
    ILogger<ExceptionHandlingMiddleware> logger,
    IWebHostEnvironment environment)
{
    /// <summary>
    /// Processes the HTTP request and handles known exceptions.
    /// </summary>
    public async Task InvokeAsync(HttpContext context)
    {
        try
        {
            await next(context);
        }
        catch (UnauthorizedAccessException ex)
        {
            await WriteProblemAsync(context, 401, "Unauthorized", ex.Message, ex, isWarning: true);
        }
        catch (KeyNotFoundException ex)
        {
            await WriteProblemAsync(context, 404, "Resource not found", ex.Message, ex, isWarning: true);
        }
        catch (InvalidOperationException ex)
        {
            await WriteProblemAsync(context, 409, "Conflict", ex.Message, ex, isWarning: true);
        }
        catch (PostgresException ex) when (ex.SqlState == "28P01")
        {
            var detail = environment.IsDevelopment()
                ? "Database authentication failed for configured PostgreSQL user/password."
                : "A database configuration error occurred.";
            await WriteProblemAsync(context, 503, "Database unavailable", detail, ex, isWarning: false);
        }
        catch (Exception ex)
        {
            var detail = environment.IsDevelopment()
                ? ex.Message
                : "An unexpected error occurred.";
            await WriteProblemAsync(context, 500, "Internal server error", detail, ex, isWarning: false);
        }
    }

    private async Task WriteProblemAsync(HttpContext context, int status, string title, string detail, Exception ex, bool isWarning)
    {
        if (isWarning) logger.LogWarning(ex, "Request failed with status {Status}.", status);
        else logger.LogError(ex, "Unhandled exception occurred.");

        context.Response.ContentType = "application/json";
        context.Response.StatusCode = status;
        var body = JsonSerializer.Serialize(new { type = "about:blank", title, status, detail });
        await context.Response.WriteAsync(body);
    }
}
