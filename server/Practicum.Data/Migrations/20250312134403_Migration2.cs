using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Practicum.Data.Migrations
{
    /// <inheritdoc />
    public partial class Migration2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateOnly>(
                name: "CreateAt",
                table: "ReMarks",
                type: "date",
                nullable: false,
                defaultValue: new DateOnly(1, 1, 1));

            migrationBuilder.AddColumn<int>(
                name: "CreatorId",
                table: "ReMarks",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "Description",
                table: "ReMarks",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Path",
                table: "ReMarks",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<int>(
                name: "ProgramFileId",
                table: "ReMarks",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Address",
                table: "Projects",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<int>(
                name: "ClientId",
                table: "Projects",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "Description",
                table: "Projects",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<DateOnly>(
                name: "EndtAt",
                table: "Projects",
                type: "date",
                nullable: false,
                defaultValue: new DateOnly(1, 1, 1));

            migrationBuilder.AddColumn<DateOnly>(
                name: "StartAt",
                table: "Projects",
                type: "date",
                nullable: false,
                defaultValue: new DateOnly(1, 1, 1));

            migrationBuilder.AddColumn<DateOnly>(
                name: "CreateAt",
                table: "ProgramFiles",
                type: "date",
                nullable: false,
                defaultValue: new DateOnly(1, 1, 1));

            migrationBuilder.AddColumn<int>(
                name: "CreatorId",
                table: "ProgramFiles",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "Description",
                table: "ProgramFiles",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Name",
                table: "ProgramFiles",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Path",
                table: "ProgramFiles",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Address",
                table: "Clients",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Email",
                table: "Clients",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Name",
                table: "Clients",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Password",
                table: "Clients",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Phone",
                table: "Clients",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.CreateIndex(
                name: "IX_ReMarks_CreatorId",
                table: "ReMarks",
                column: "CreatorId");

            migrationBuilder.CreateIndex(
                name: "IX_ReMarks_ProgramFileId",
                table: "ReMarks",
                column: "ProgramFileId");

            migrationBuilder.CreateIndex(
                name: "IX_Projects_ClientId",
                table: "Projects",
                column: "ClientId");

            migrationBuilder.CreateIndex(
                name: "IX_ProgramFiles_CreatorId",
                table: "ProgramFiles",
                column: "CreatorId");

            migrationBuilder.AddForeignKey(
                name: "FK_ProgramFiles_Clients_CreatorId",
                table: "ProgramFiles",
                column: "CreatorId",
                principalTable: "Clients",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Projects_Clients_ClientId",
                table: "Projects",
                column: "ClientId",
                principalTable: "Clients",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_ReMarks_Clients_CreatorId",
                table: "ReMarks",
                column: "CreatorId",
                principalTable: "Clients",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_ReMarks_ProgramFiles_ProgramFileId",
                table: "ReMarks",
                column: "ProgramFileId",
                principalTable: "ProgramFiles",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ProgramFiles_Clients_CreatorId",
                table: "ProgramFiles");

            migrationBuilder.DropForeignKey(
                name: "FK_Projects_Clients_ClientId",
                table: "Projects");

            migrationBuilder.DropForeignKey(
                name: "FK_ReMarks_Clients_CreatorId",
                table: "ReMarks");

            migrationBuilder.DropForeignKey(
                name: "FK_ReMarks_ProgramFiles_ProgramFileId",
                table: "ReMarks");

            migrationBuilder.DropIndex(
                name: "IX_ReMarks_CreatorId",
                table: "ReMarks");

            migrationBuilder.DropIndex(
                name: "IX_ReMarks_ProgramFileId",
                table: "ReMarks");

            migrationBuilder.DropIndex(
                name: "IX_Projects_ClientId",
                table: "Projects");

            migrationBuilder.DropIndex(
                name: "IX_ProgramFiles_CreatorId",
                table: "ProgramFiles");

            migrationBuilder.DropColumn(
                name: "CreateAt",
                table: "ReMarks");

            migrationBuilder.DropColumn(
                name: "CreatorId",
                table: "ReMarks");

            migrationBuilder.DropColumn(
                name: "Description",
                table: "ReMarks");

            migrationBuilder.DropColumn(
                name: "Path",
                table: "ReMarks");

            migrationBuilder.DropColumn(
                name: "ProgramFileId",
                table: "ReMarks");

            migrationBuilder.DropColumn(
                name: "Address",
                table: "Projects");

            migrationBuilder.DropColumn(
                name: "ClientId",
                table: "Projects");

            migrationBuilder.DropColumn(
                name: "Description",
                table: "Projects");

            migrationBuilder.DropColumn(
                name: "EndtAt",
                table: "Projects");

            migrationBuilder.DropColumn(
                name: "StartAt",
                table: "Projects");

            migrationBuilder.DropColumn(
                name: "CreateAt",
                table: "ProgramFiles");

            migrationBuilder.DropColumn(
                name: "CreatorId",
                table: "ProgramFiles");

            migrationBuilder.DropColumn(
                name: "Description",
                table: "ProgramFiles");

            migrationBuilder.DropColumn(
                name: "Name",
                table: "ProgramFiles");

            migrationBuilder.DropColumn(
                name: "Path",
                table: "ProgramFiles");

            migrationBuilder.DropColumn(
                name: "Address",
                table: "Clients");

            migrationBuilder.DropColumn(
                name: "Email",
                table: "Clients");

            migrationBuilder.DropColumn(
                name: "Name",
                table: "Clients");

            migrationBuilder.DropColumn(
                name: "Password",
                table: "Clients");

            migrationBuilder.DropColumn(
                name: "Phone",
                table: "Clients");
        }
    }
}
