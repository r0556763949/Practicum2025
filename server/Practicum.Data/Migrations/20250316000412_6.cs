using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Practicum.Data.Migrations
{
    /// <inheritdoc />
    public partial class _6 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ProgramFilId",
                table: "ReMarks");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "ProgramFilId",
                table: "ReMarks",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }
    }
}
