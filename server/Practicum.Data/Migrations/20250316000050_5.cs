using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Practicum.Data.Migrations
{
    /// <inheritdoc />
    public partial class _5 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ReMarks_Clients_CreatorId",
                table: "ReMarks");

            migrationBuilder.DropIndex(
                name: "IX_ReMarks_CreatorId",
                table: "ReMarks");

            migrationBuilder.RenameColumn(
                name: "CreatorId",
                table: "ReMarks",
                newName: "ProgramFilId");

            migrationBuilder.AlterColumn<DateTime>(
                name: "CreateAt",
                table: "ReMarks",
                type: "datetime2",
                nullable: false,
                oldClrType: typeof(DateOnly),
                oldType: "date");

            migrationBuilder.AddColumn<int>(
                name: "ClientId",
                table: "ReMarks",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_ReMarks_ClientId",
                table: "ReMarks",
                column: "ClientId");

            migrationBuilder.AddForeignKey(
                name: "FK_ReMarks_Clients_ClientId",
                table: "ReMarks",
                column: "ClientId",
                principalTable: "Clients",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ReMarks_Clients_ClientId",
                table: "ReMarks");

            migrationBuilder.DropIndex(
                name: "IX_ReMarks_ClientId",
                table: "ReMarks");

            migrationBuilder.DropColumn(
                name: "ClientId",
                table: "ReMarks");

            migrationBuilder.RenameColumn(
                name: "ProgramFilId",
                table: "ReMarks",
                newName: "CreatorId");

            migrationBuilder.AlterColumn<DateOnly>(
                name: "CreateAt",
                table: "ReMarks",
                type: "date",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldType: "datetime2");

            migrationBuilder.CreateIndex(
                name: "IX_ReMarks_CreatorId",
                table: "ReMarks",
                column: "CreatorId");

            migrationBuilder.AddForeignKey(
                name: "FK_ReMarks_Clients_CreatorId",
                table: "ReMarks",
                column: "CreatorId",
                principalTable: "Clients",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
