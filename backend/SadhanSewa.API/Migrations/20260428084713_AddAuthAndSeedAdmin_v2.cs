using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SadhanSewa.API.Migrations
{
    /// <inheritdoc />
    public partial class AddAuthAndSeedAdmin_v2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: 1,
                column: "CreatedAt",
                value: new DateTime(2026, 4, 28, 8, 47, 12, 821, DateTimeKind.Utc).AddTicks(7318));

            migrationBuilder.UpdateData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: 2,
                column: "CreatedAt",
                value: new DateTime(2026, 4, 28, 8, 47, 12, 821, DateTimeKind.Utc).AddTicks(8487));

            migrationBuilder.UpdateData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: 3,
                column: "CreatedAt",
                value: new DateTime(2026, 4, 28, 8, 47, 12, 821, DateTimeKind.Utc).AddTicks(8490));

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "CreatedAt", "Email", "FullName", "IsActive", "PasswordHash", "Phone", "RoleId", "UpdatedAt" },
                values: new object[] { 1, new DateTime(2026, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), "admin@sadhansewa.com", "System Administrator", true, "$2a$11$dQzjTqlrGG2yxgady5kHCevD3Gd5n/Xk8cZY2r5x.xleP2Ci6EboG", null, 1, new DateTime(2026, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc) });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.UpdateData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: 1,
                column: "CreatedAt",
                value: new DateTime(2026, 4, 26, 13, 48, 57, 984, DateTimeKind.Utc).AddTicks(3306));

            migrationBuilder.UpdateData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: 2,
                column: "CreatedAt",
                value: new DateTime(2026, 4, 26, 13, 48, 57, 984, DateTimeKind.Utc).AddTicks(4883));

            migrationBuilder.UpdateData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: 3,
                column: "CreatedAt",
                value: new DateTime(2026, 4, 26, 13, 48, 57, 984, DateTimeKind.Utc).AddTicks(4887));
        }
    }
}
