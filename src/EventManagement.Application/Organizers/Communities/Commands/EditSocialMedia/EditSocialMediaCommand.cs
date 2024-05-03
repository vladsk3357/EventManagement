using EventManagement.Application.Common.Exceptions;
using EventManagement.Application.Common.Interfaces;
using EventManagement.Application.Common.Security;
using EventManagement.Domain.Entities.Community;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace EventManagement.Application.Organizers.Communities.Commands.EditSocialMedia;

[Authorize]
public sealed record EditSocialMediaCommand(
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
    string? TelegramUrl) : IRequest;

internal sealed class EditSocialMediaCommandHandler(
    IApplicationDbContext context, 
    ICurrentUserAccessor currentUserAccessor) : IRequestHandler<EditSocialMediaCommand>
{
    private readonly IApplicationDbContext _context = context;
    private readonly ICurrentUserAccessor _currentUserAccessor = currentUserAccessor;

    public async Task Handle(EditSocialMediaCommand request, CancellationToken cancellationToken)
    {
        var community = _context.Communities
            .Include(c => c.SocialMedia)
            .FirstOrDefault(c => c.Id == request.CommunityId && c.OrganizerId == _currentUserAccessor.UserId)
            ?? throw new NotFoundException(nameof(Community), request.CommunityId);

        UpdateSocialMedia(community, request);
        await _context.SaveChangesAsync(cancellationToken);
    }

    private static void UpdateSocialMedia(Community community, EditSocialMediaCommand request)
    {
        community.SocialMedia.WebsiteUrl = request.WebsiteUrl;
        community.SocialMedia.FacebookUrl = request.FacebookUrl;
        community.SocialMedia.TwitterUrl = request.TwitterUrl;
        community.SocialMedia.LinkedInUrl = request.LinkedInUrl;
        community.SocialMedia.InstagramUrl = request.InstagramUrl;
        community.SocialMedia.YouTubeUrl = request.YouTubeUrl;
        community.SocialMedia.DiscordUrl = request.DiscordUrl;
        community.SocialMedia.SlackUrl = request.SlackUrl;
        community.SocialMedia.TwitchUrl = request.TwitchUrl;
        community.SocialMedia.MediumUrl = request.MediumUrl;
        community.SocialMedia.TikTokUrl = request.TikTokUrl;
        community.SocialMedia.TelegramUrl = request.TelegramUrl;
    }
}
