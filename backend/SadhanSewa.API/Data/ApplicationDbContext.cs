using Microsoft.EntityFrameworkCore;
using SadhanSewa.API.Models;

namespace SadhanSewa.API.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options) { }

        // DbSet for each entity
        public DbSet<Role> Roles { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Vehicle> Vehicles { get; set; }
        public DbSet<Vendor> Vendors { get; set; }
        public DbSet<Part> Parts { get; set; }
        public DbSet<PurchaseInvoice> PurchaseInvoices { get; set; }
        public DbSet<PurchaseInvoiceItem> PurchaseInvoiceItems { get; set; }
        public DbSet<SalesInvoice> SalesInvoices { get; set; }
        public DbSet<SalesInvoiceItem> SalesInvoiceItems { get; set; }
        public DbSet<Appointment> Appointments { get; set; }
        public DbSet<Review> Reviews { get; set; }
        public DbSet<PartRequest> PartRequests { get; set; }
        public DbSet<Notification> Notifications { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Unique constraints
            modelBuilder.Entity<User>()
                .HasIndex(u => u.Email)
                .IsUnique();

            modelBuilder.Entity<Part>()
                .HasIndex(p => p.SKU)
                .IsUnique();

            modelBuilder.Entity<Vehicle>()
                .HasIndex(v => v.LicensePlate)
                .IsUnique();

            modelBuilder.Entity<SalesInvoice>()
                .HasIndex(s => s.InvoiceNumber)
                .IsUnique();

            modelBuilder.Entity<Role>()
                .HasIndex(r => r.Name)
                .IsUnique();

            // Handle multiple FK from User to SalesInvoice
            modelBuilder.Entity<SalesInvoice>()
                .HasOne(s => s.Customer)
                .WithMany()
                .HasForeignKey(s => s.CustomerId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<SalesInvoice>()
                .HasOne(s => s.CreatedBy)
                .WithMany()
                .HasForeignKey(s => s.CreatedById)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<PurchaseInvoice>()
                .HasOne(p => p.CreatedBy)
                .WithMany()
                .HasForeignKey(p => p.CreatedById)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<PurchaseInvoice>()
                .Property(p => p.SessionCode)
                .HasMaxLength(20)
                .IsRequired();

            modelBuilder.Entity<PurchaseInvoice>()
                .Property(p => p.Status)
                .HasConversion<int>();

            modelBuilder.Entity<PurchaseInvoiceItem>()
                .Property(i => i.VendorName)
                .HasMaxLength(200)
                .IsRequired();

            // Seed default roles
            modelBuilder.Entity<Role>().HasData(
                new Role { Id = 1, Name = "Admin", Description = "Full system control — manage staff, vendors, inventory, and generate financial reports" },
                new Role { Id = 2, Name = "Staff", Description = "Handle customer registrations, part sales, invoicing, and customer reports" },
                new Role { Id = 3, Name = "Customer", Description = "Self-register, book appointments, track history, and receive AI alerts" }
            );

            /*
            // Seed default Admin user (password: Admin@123)
            modelBuilder.Entity<User>().HasData(
                new User
                {
                    Id = 1,
                    FullName = "System Administrator",
                    Email = "admin@sadhansewa.com",
                    Phone = null,
                    PasswordHash = "$2a$11$K7pYpYpYpYpYpYpYpYpYpYpYpYpYpYpYpYpYpYpYpYpYpYpYpYpYp", // Placeholder
                    RoleId = 1,
                    IsActive = true,
                    CreatedAt = new DateTime(2026, 1, 1, 0, 0, 0, DateTimeKind.Utc),
                    UpdatedAt = new DateTime(2026, 1, 1, 0, 0, 0, DateTimeKind.Utc)
                }
            );
            */
        }
    }
}
