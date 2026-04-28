using Microsoft.EntityFrameworkCore;
using SadhanSewa.API.Data;
using SadhanSewa.API.Middleware;
using SadhanSewa.API.Services.PurchaseInvoice;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddControllers();
builder.Services.AddScoped<IPurchaseInvoiceService, PurchaseInvoiceService>();

builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseNpgsql(
        builder.Configuration.GetConnectionString("DefaultConnection")));

var app = builder.Build();

app.UseSwagger();
app.UseSwaggerUI();
app.UseMiddleware<ExceptionHandlingMiddleware>();
app.MapControllers();

app.MapGet("/", () => "SadhanSewa API is running");

app.Run();