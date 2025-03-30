using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Practicum.Data.Migrations
{
    /// <inheritdoc />
    public partial class UpdateClientpassword : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {


            migrationBuilder.AlterColumn<string>(
                name: "PasswordHash",
                table: "Clients",
                type: "longtext",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "longtext")
                .Annotation("MySql:CharSet", "utf8mb4")
                .OldAnnotation("MySql:CharSet", "utf8mb4");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {


            migrationBuilder.UpdateData(
                table: "Clients",
                keyColumn: "PasswordHash",
                keyValue: null,
                column: "PasswordHash",
                value: "");

            migrationBuilder.AlterColumn<string>(
                name: "PasswordHash",
                table: "Clients",
                type: "longtext",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "longtext",
                oldNullable: true)
                .Annotation("MySql:CharSet", "utf8mb4")
                .OldAnnotation("MySql:CharSet", "utf8mb4");


        }
    }
}
