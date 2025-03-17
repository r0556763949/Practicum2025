using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Practicum.Data.Migrations
{
    /// <inheritdoc />
    public partial class _13 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ProgramFiles_Clients_CreatorId",
                table: "ProgramFiles");

            migrationBuilder.DropIndex(
                name: "IX_ProgramFiles_CreatorId",
                table: "ProgramFiles");

            migrationBuilder.RenameColumn(
                name: "CreatorId",
                table: "ProgramFiles",
                newName: "ClientId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "ClientId",
                table: "ProgramFiles",
                newName: "CreatorId");

            migrationBuilder.CreateIndex(
                name: "IX_ProgramFiles_CreatorId",
                table: "ProgramFiles",
                column: "CreatorId");

            migrationBuilder.AddForeignKey(
                name: "FK_ProgramFiles_Clients_CreatorId",
                table: "ProgramFiles",
                column: "CreatorId",
                principalTable: "Clients",
                principalColumn: "Id");
        }
    }
}
