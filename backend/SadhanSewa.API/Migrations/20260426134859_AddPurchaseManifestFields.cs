using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SadhanSewa.API.Migrations
{
    /// <inheritdoc />
    public partial class AddPurchaseManifestFields : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<int>(
                name: "Status",
                table: "PurchaseInvoices",
                type: "integer",
                maxLength: 20,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "character varying(20)",
                oldMaxLength: 20);

            migrationBuilder.AddColumn<DateTime>(
                name: "ExpectedIntakeDate",
                table: "PurchaseInvoices",
                type: "timestamp with time zone",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<string>(
                name: "SessionCode",
                table: "PurchaseInvoices",
                type: "character varying(20)",
                maxLength: 20,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<DateTime>(
                name: "UpdatedAt",
                table: "PurchaseInvoices",
                type: "timestamp with time zone",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "IsLowStockAlert",
                table: "PurchaseInvoiceItems",
                type: "boolean",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<string>(
                name: "VendorName",
                table: "PurchaseInvoiceItems",
                type: "character varying(200)",
                maxLength: 200,
                nullable: false,
                defaultValue: "");

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

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ExpectedIntakeDate",
                table: "PurchaseInvoices");

            migrationBuilder.DropColumn(
                name: "SessionCode",
                table: "PurchaseInvoices");

            migrationBuilder.DropColumn(
                name: "UpdatedAt",
                table: "PurchaseInvoices");

            migrationBuilder.DropColumn(
                name: "IsLowStockAlert",
                table: "PurchaseInvoiceItems");

            migrationBuilder.DropColumn(
                name: "VendorName",
                table: "PurchaseInvoiceItems");

            migrationBuilder.AlterColumn<string>(
                name: "Status",
                table: "PurchaseInvoices",
                type: "character varying(20)",
                maxLength: 20,
                nullable: false,
                oldClrType: typeof(int),
                oldType: "integer",
                oldMaxLength: 20);

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
    }
}
