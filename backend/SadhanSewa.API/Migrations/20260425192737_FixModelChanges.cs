using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SadhanSewa.API.Migrations
{
    /// <inheritdoc />
    public partial class FixModelChanges : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: 1,
                column: "CreatedAt",
                value: new DateTime(2026, 4, 25, 19, 27, 36, 512, DateTimeKind.Utc).AddTicks(2476));

            migrationBuilder.UpdateData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: 2,
                column: "CreatedAt",
                value: new DateTime(2026, 4, 25, 19, 27, 36, 512, DateTimeKind.Utc).AddTicks(3616));

            migrationBuilder.UpdateData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: 3,
                column: "CreatedAt",
                value: new DateTime(2026, 4, 25, 19, 27, 36, 512, DateTimeKind.Utc).AddTicks(3619));
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: 1,
                column: "CreatedAt",
                value: new DateTime(2026, 4, 25, 19, 10, 7, 689, DateTimeKind.Utc).AddTicks(4005));

            migrationBuilder.UpdateData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: 2,
                column: "CreatedAt",
                value: new DateTime(2026, 4, 25, 19, 10, 7, 689, DateTimeKind.Utc).AddTicks(5137));

            migrationBuilder.UpdateData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: 3,
                column: "CreatedAt",
                value: new DateTime(2026, 4, 25, 19, 10, 7, 689, DateTimeKind.Utc).AddTicks(5140));
        }
    }
}
