using EventManagement.Domain.Entities.Community;

namespace EventManagement.Application.Common.Models.Community;

internal static class SocialMediaDtoMapper
{
    public static SocialMediaDto ToDto(this SocialMedia socialMedia) => new(
        socialMedia.CommunityId,
        socialMedia.WebsiteUrl,
        socialMedia.FacebookUrl,
        socialMedia.TwitterUrl,
        socialMedia.LinkedInUrl,
        socialMedia.InstagramUrl,
        socialMedia.YouTubeUrl,
        socialMedia.DiscordUrl,
        socialMedia.SlackUrl,
        socialMedia.TwitchUrl,
        socialMedia.MediumUrl,
        socialMedia.TikTokUrl,
        socialMedia.TelegramUrl);

    public static SocialMedia ToEntity(this SocialMediaDto socialMediaDto) => new()
    {
        CommunityId = socialMediaDto.CommunityId,
        WebsiteUrl = socialMediaDto.WebsiteUrl,
        FacebookUrl = socialMediaDto.FacebookUrl,
        TwitterUrl = socialMediaDto.TwitterUrl,
        LinkedInUrl = socialMediaDto.LinkedInUrl,
        InstagramUrl = socialMediaDto.InstagramUrl,
        YouTubeUrl = socialMediaDto.YouTubeUrl,
        DiscordUrl = socialMediaDto.DiscordUrl,
        SlackUrl = socialMediaDto.SlackUrl,
        TwitchUrl = socialMediaDto.TwitchUrl,
        MediumUrl = socialMediaDto.MediumUrl,
        TikTokUrl = socialMediaDto.TikTokUrl,
        TelegramUrl = socialMediaDto.TelegramUrl
    };
}
