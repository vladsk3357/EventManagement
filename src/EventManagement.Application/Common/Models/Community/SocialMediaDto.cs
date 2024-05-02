namespace EventManagement.Application.Common.Models.Community;

public sealed record SocialMediaDto(
    int CommunityId,
    string? WebsiteUrl,
    string? FacebookUrl,
    string? TwitterUrl,
    string? LinkedInUrl,
    string? InstagramUrl,
    string? YouTubeUrl,
    string? DiscordUrl,
    string? SlackUrl,
    string? TwitchUrl,
    string? MediumUrl,
    string? TikTokUrl,
    string? TelegramUrl);
