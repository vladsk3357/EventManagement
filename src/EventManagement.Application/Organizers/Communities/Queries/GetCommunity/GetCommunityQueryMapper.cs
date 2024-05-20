using EventManagement.Application.Common.Models.Community;
using EventManagement.Domain.Entities.Community;

namespace EventManagement.Application.Organizers.Communities.Queries.GetCommunity;

internal static class GetCommunityQueryMapper
{
    public static GetCommunityDto ToDto(this Community community, string? communityImage)
    {
        return new GetCommunityDto(
            community.Id,
            community.Name,
            community.Location,
            community.Domain,
            community.ShortDescription,
            community.Description,
            communityImage,
            community.SocialMedia?.ToDto());
    }
}
