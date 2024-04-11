namespace EventManagement.Application.Communities.Queries.GetMyCommunities;

public sealed record GetMyCommunitiesDto(
    int Id,
    string Name,
    int SubscribersCount,
    bool IsOwner);
