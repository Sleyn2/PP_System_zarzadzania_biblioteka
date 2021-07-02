using Microsoft.EntityFrameworkCore.Migrations;

namespace PP.Migrations
{
    public partial class repaired_borrowing : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Borrowing_AspNetUsers_UserId1",
                table: "Borrowing");

            migrationBuilder.DropIndex(
                name: "IX_Borrowing_UserId1",
                table: "Borrowing");

            migrationBuilder.DropColumn(
                name: "UserId1",
                table: "Borrowing");

            migrationBuilder.AlterColumn<string>(
                name: "UserId",
                table: "Borrowing",
                type: "nvarchar(450)",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.CreateIndex(
                name: "IX_Borrowing_UserId",
                table: "Borrowing",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Borrowing_AspNetUsers_UserId",
                table: "Borrowing",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Borrowing_AspNetUsers_UserId",
                table: "Borrowing");

            migrationBuilder.DropIndex(
                name: "IX_Borrowing_UserId",
                table: "Borrowing");

            migrationBuilder.AlterColumn<int>(
                name: "UserId",
                table: "Borrowing",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)",
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "UserId1",
                table: "Borrowing",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Borrowing_UserId1",
                table: "Borrowing",
                column: "UserId1");

            migrationBuilder.AddForeignKey(
                name: "FK_Borrowing_AspNetUsers_UserId1",
                table: "Borrowing",
                column: "UserId1",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
