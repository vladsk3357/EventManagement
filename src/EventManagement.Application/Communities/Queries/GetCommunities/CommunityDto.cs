namespace EventManagement.Application.Communities.Queries.GetCommunities;

public sealed record CommunityDto(
    int Id, 
    string Name, 
    string Location,
    string? CommunityImageUrl,
    string Domain,
    int SubscribersCount);
