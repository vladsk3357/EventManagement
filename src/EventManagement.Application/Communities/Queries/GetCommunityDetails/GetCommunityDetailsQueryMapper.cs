using EventManagement.Domain.Entities;

namespace EventManagement.Application.Communities.Queries.GetCommunityDetails;

internal static class GetCommunityDetailsQueryMapper
{
    public static CommunityDetailsDto ToDto(Community community, int subscriberCount, bool isSubscribed, bool isOrganizer, bool requiresFormAnswer, int formId) => new(
            community.Id,
            community.Name,
            community.Location,
            community.ShortDescription,
            community.Description,
            subscriberCount,
            isSubscribed,
            isOrganizer,
            requiresFormAnswer,
            formId
        );
}
