using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace EventManagement.Infrastructure.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class Changecolumnnames : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_SessionSpeaker_Sessions_SessionId",
                table: "SessionSpeaker");

            migrationBuilder.RenameColumn(
                name: "SessionId",
                table: "SessionSpeaker",
                newName: "SessionsId");

            migrationBuilder.AddForeignKey(
                name: "FK_SessionSpeaker_Sessions_SessionsId",
                table: "SessionSpeaker",
                column: "SessionsId",
                principalTable: "Sessions",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_SessionSpeaker_Sessions_SessionsId",
                table: "SessionSpeaker");

            migrationBuilder.RenameColumn(
                name: "SessionsId",
                table: "SessionSpeaker",
                newName: "SessionId");

            migrationBuilder.AddForeignKey(
                name: "FK_SessionSpeaker_Sessions_SessionId",
                table: "SessionSpeaker",
                column: "SessionId",
                principalTable: "Sessions",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
