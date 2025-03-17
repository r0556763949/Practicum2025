using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Practicum.Data.Migrations
{
    /// <inheritdoc />
    public partial class _11 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Description",
                table: "ReMarks");

            migrationBuilder.RenameColumn(
                name: "Path",
                table: "ReMarks",
                newName: "Content");

            migrationBuilder.AddColumn<string>(
                name: "Path",
                table: "ProgramFiles",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Path",
                table: "ProgramFiles");

            migrationBuilder.RenameColumn(
                name: "Content",
                table: "ReMarks",
                newName: "Path");

            migrationBuilder.AddColumn<string>(
                name: "Description",
                table: "ReMarks",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }
    }
}
