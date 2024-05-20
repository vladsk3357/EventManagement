using EventManagement.Application.Common.Services.Documents;

namespace EventManagement.Infrastructure.Search.Documents.Community;

internal static class Mapper
{
    public static CommunityDocument ToDocument(this CommunityIndexDocument community) => new(
        community.Id,
        community.Name,
        community.Name,
        community.Description,
        community.Location,
        community.Domain,
        community.SubscribersCount);

    public static CommunityIndexDocument ToIndexDocument(this CommunityDocument community) => new(
        community.Id,
        community.Name,
        community.Description,
        community.Location,
        community.Domain,
        community.SubscribersCount);
}
