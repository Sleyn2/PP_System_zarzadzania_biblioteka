using Microsoft.EntityFrameworkCore.Migrations;

namespace PP.Migrations
{
    public partial class fixedName : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_libInfos",
                table: "libInfos");

            migrationBuilder.RenameTable(
                name: "libInfos",
                newName: "LibraryInformation");

            migrationBuilder.AddPrimaryKey(
                name: "PK_LibraryInformation",
                table: "LibraryInformation",
                column: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_LibraryInformation",
                table: "LibraryInformation");

            migrationBuilder.RenameTable(
                name: "LibraryInformation",
                newName: "libInfos");

            migrationBuilder.AddPrimaryKey(
                name: "PK_libInfos",
                table: "libInfos",
                column: "Id");
        }
    }
}
