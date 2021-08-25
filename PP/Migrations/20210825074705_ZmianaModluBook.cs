using Microsoft.EntityFrameworkCore.Migrations;

namespace PP.Migrations
{
    public partial class ZmianaModluBook : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "AvaliableCount",
                table: "Book",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AvaliableCount",
                table: "Book");
        }
    }
}
