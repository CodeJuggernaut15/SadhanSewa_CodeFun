using Microsoft.OpenApi.Models;
using Microsoft.EntityFrameworkCore;
using SadhanSewa.API.Data;
using SadhanSewa.API.Middleware;
using SadhanSewa.API.Services.PurchaseInvoice;

var builder = WebApplication.CreateBuilder(args);


builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddControllers();
builder.Services.AddScoped<IPurchaseInvoiceService, PurchaseInvoiceService>();


// ? Add controllers
builder.Services.AddControllers();

// ? Swagger / OpenAPI
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo
    {
        Title = "SadhanSewa.API",
        Version = "v1"
    });
});

// ? Database

builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseNpgsql(
        builder.Configuration.GetConnectionString("DefaultConnection")));

// ? CORS (IMPORTANT for frontend)
builder.Services.AddCors(options =>
{
    options.AddPolicy("FrontendPolicy", policy =>
    {
        policy
            .AllowAnyOrigin()
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});

var app = builder.Build();
app.UseSwagger();
app.UseSwaggerUI();
app.UseMiddleware<ExceptionHandlingMiddleware>();
app.MapControllers();

app.MapGet("/", () => "SadhanSewa API is running");

// ? Middleware
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "SadhanSewa.API v1");
    });
}

app.UseHttpsRedirection();

app.UseCors("FrontendPolicy"); // ? Enable CORS

app.UseAuthorization();

app.MapControllers();


app.Run();