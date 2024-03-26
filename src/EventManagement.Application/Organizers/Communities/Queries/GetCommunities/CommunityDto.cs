namespace EventManagement.Application.Organizers.Communities.Queries.GetCommunities;

public record CommunityDto(
    int Id,
    string Name,
    string Location,
    string Domain);
