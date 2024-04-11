using EventManagement.Domain.Entities;

namespace EventManagement.Application.Organizers.Communities.Queries.GetCommunity;

internal static class GetCommunityQueryMapper
{
    public static GetCommunityDto ToDto(this Community community)
    {
        return new GetCommunityDto(
            community.Id,
            community.Name,
            community.Location,
            community.Domain,
            community.ShortDescription,
            community.Description);
    }
}
