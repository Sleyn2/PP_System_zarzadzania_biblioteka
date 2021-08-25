using Microsoft.EntityFrameworkCore.Migrations;

namespace PP.Migrations
{
    public partial class fixForBorrowingAndBooks : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Borrowing_Book_BookId",
                table: "Borrowing");

            migrationBuilder.DropColumn(
                name: "AvaliableCount",
                table: "Book");

            migrationBuilder.AlterColumn<int>(
                name: "BookId",
                table: "Borrowing",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Borrowing_Book_BookId",
                table: "Borrowing",
                column: "BookId",
                principalTable: "Book",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Borrowing_Book_BookId",
                table: "Borrowing");

            migrationBuilder.AlterColumn<int>(
                name: "BookId",
                table: "Borrowing",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddColumn<int>(
                name: "AvaliableCount",
                table: "Book",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddForeignKey(
                name: "FK_Borrowing_Book_BookId",
                table: "Borrowing",
                column: "BookId",
                principalTable: "Book",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
