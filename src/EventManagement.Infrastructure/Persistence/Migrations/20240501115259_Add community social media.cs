using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace EventManagement.Infrastructure.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class Addcommunitysocialmedia : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "SocialMediaId",
                table: "Communities",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "CommunitySocialMedia",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CommunityId = table.Column<int>(type: "int", nullable: false),
                    WebsiteUrl = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: true),
                    FacebookUrl = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: true),
                    TwitterUrl = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: true),
                    LinkedInUrl = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: true),
                    InstagramUrl = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: true),
                    YouTubeUrl = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: true),
                    DiscordUrl = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: true),
                    SlackUrl = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: true),
                    TwitchUrl = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: true),
                    MediumUrl = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: true),
                    TikTokUrl = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: true),
                    TelegramUrl = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CommunitySocialMedia", x => x.Id);
                    table.ForeignKey(
                        name: "FK_CommunitySocialMedia_Communities_CommunityId",
                        column: x => x.CommunityId,
                        principalTable: "Communities",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_CommunitySocialMedia_CommunityId",
                table: "CommunitySocialMedia",
                column: "CommunityId",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "CommunitySocialMedia");

            migrationBuilder.DropColumn(
                name: "SocialMediaId",
                table: "Communities");
        }
    }
}
