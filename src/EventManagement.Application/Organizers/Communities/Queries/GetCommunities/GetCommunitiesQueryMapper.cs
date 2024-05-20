using EventManagement.Domain.Entities.Community;

namespace EventManagement.Application.Organizers.Communities.Queries.GetCommunities;

internal static class GetCommunitiesQueryMapper
{
    public static CommunityDto ToDto(this Community community, string? communityImage) => new(
        Id: community.Id,
        Name: community.Name,
        Domain: community.Domain,
        Location: community.Location,
        CommunityImageUrl: communityImage
    );
}
