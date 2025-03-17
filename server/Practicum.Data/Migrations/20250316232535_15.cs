using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Practicum.Data.Migrations
{
    /// <inheritdoc />
    public partial class _15 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ReMarks_Clients_ClientId",
                table: "ReMarks");

            migrationBuilder.AlterColumn<int>(
                name: "ClientId",
                table: "ReMarks",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddForeignKey(
                name: "FK_ReMarks_Clients_ClientId",
                table: "ReMarks",
                column: "ClientId",
                principalTable: "Clients",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ReMarks_Clients_ClientId",
                table: "ReMarks");

            migrationBuilder.AlterColumn<int>(
                name: "ClientId",
                table: "ReMarks",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_ReMarks_Clients_ClientId",
                table: "ReMarks",
                column: "ClientId",
                principalTable: "Clients",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
