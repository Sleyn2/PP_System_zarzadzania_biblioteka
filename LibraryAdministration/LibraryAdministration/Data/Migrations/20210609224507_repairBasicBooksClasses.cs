using Microsoft.EntityFrameworkCore.Migrations;

namespace LibraryAdministration.Data.Migrations
{
    public partial class repairBasicBooksClasses : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_Borrowind",
                table: "Borrowind");

            migrationBuilder.RenameTable(
                name: "Borrowind",
                newName: "Borrowing");

            migrationBuilder.AlterColumn<string>(
                name: "UserId",
                table: "Borrowing",
                type: "nvarchar(450)",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Borrowing",
                table: "Borrowing",
                column: "Id");

            migrationBuilder.CreateIndex(
                name: "IX_Book_AuthorId",
                table: "Book",
                column: "AuthorId");

            migrationBuilder.CreateIndex(
                name: "IX_Borrowing_BookId",
                table: "Borrowing",
                column: "BookId");

            migrationBuilder.CreateIndex(
                name: "IX_Borrowing_UserId",
                table: "Borrowing",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Book_Author_AuthorId",
                table: "Book",
                column: "AuthorId",
                principalTable: "Author",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Borrowing_Book_BookId",
                table: "Borrowing",
                column: "BookId",
                principalTable: "Book",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Borrowing_Customer_UserId",
                table: "Borrowing",
                column: "UserId",
                principalTable: "Customer",
                principalColumn: "UserId",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Book_Author_AuthorId",
                table: "Book");

            migrationBuilder.DropForeignKey(
                name: "FK_Borrowing_Book_BookId",
                table: "Borrowing");

            migrationBuilder.DropForeignKey(
                name: "FK_Borrowing_Customer_UserId",
                table: "Borrowing");

            migrationBuilder.DropIndex(
                name: "IX_Book_AuthorId",
                table: "Book");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Borrowing",
                table: "Borrowing");

            migrationBuilder.DropIndex(
                name: "IX_Borrowing_BookId",
                table: "Borrowing");

            migrationBuilder.DropIndex(
                name: "IX_Borrowing_UserId",
                table: "Borrowing");

            migrationBuilder.RenameTable(
                name: "Borrowing",
                newName: "Borrowind");

            migrationBuilder.AlterColumn<int>(
                name: "UserId",
                table: "Borrowind",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)",
                oldNullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_Borrowind",
                table: "Borrowind",
                column: "Id");
        }
    }
}
