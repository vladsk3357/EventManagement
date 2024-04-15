namespace EventManagement.Application.Search.Queries.Search.Response;

public sealed record SearchResultDto(ICollection<CommunityDto> Communities);

public sealed record CommunityDto(int Id, string Name, string Location);
