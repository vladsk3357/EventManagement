namespace EventManagement.Application.Organizers.Communities.Queries.GetCommunities;

using Community = Domain.Entities.Community;

internal static class GetCommunitiesQueryMapper
{
    public static CommunityDto ToDto(this Community community) => new(
        Id: community.Id,
        Name: community.Name,
        Domain: community.Domain,
        Location: community.Location
    );
}
