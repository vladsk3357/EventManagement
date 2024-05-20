namespace EventManagement.Domain.Entities.Community;

public class SocialMedia
{
    public int Id { get; set; }

    public int CommunityId { get; set; }

    public Community Community { get; set; } = null!;

    public string? WebsiteUrl { get; set; }

    public string? FacebookUrl { get; set; }

    public string? TwitterUrl { get; set; }

    public string? LinkedInUrl { get; set; }

    public string? InstagramUrl { get; set; }

    public string? YouTubeUrl { get; set; }

    public string? DiscordUrl { get; set; }

    public string? SlackUrl { get; set; }

    public string? TwitchUrl { get; set; }

    public string? MediumUrl { get; set; }

    public string? TikTokUrl { get; set; }

    public string? TelegramUrl { get; set; }
}
