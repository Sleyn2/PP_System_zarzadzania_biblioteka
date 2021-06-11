using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace LibraryAdministration.Data.Migrations
{
    public partial class ShemaUpdate_Prolong : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Tests");

            migrationBuilder.DropColumn(
                name: "ReleaseYear",
                table: "Book");

            migrationBuilder.AddColumn<string>(
                name: "CardNumber",
                table: "Customer",
                type: "nvarchar(10)",
                maxLength: 10,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<DateTime>(
                name: "CheckInDate",
                table: "Borrowing",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<int>(
                name: "Status",
                table: "Borrowing",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "ProlongationRequests",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    BorrowingId = table.Column<int>(type: "int", nullable: false),
                    NewFinishDate = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProlongationRequests", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ProlongationRequests_Borrowing_BorrowingId",
                        column: x => x.BorrowingId,
                        principalTable: "Borrowing",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ProlongationRequests_BorrowingId",
                table: "ProlongationRequests",
                column: "BorrowingId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ProlongationRequests");

            migrationBuilder.DropColumn(
                name: "CardNumber",
                table: "Customer");

            migrationBuilder.DropColumn(
                name: "CheckInDate",
                table: "Borrowing");

            migrationBuilder.DropColumn(
                name: "Status",
                table: "Borrowing");

            migrationBuilder.AddColumn<int>(
                name: "ReleaseYear",
                table: "Book",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "Tests",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Tests", x => x.Id);
                });
        }
    }
}
