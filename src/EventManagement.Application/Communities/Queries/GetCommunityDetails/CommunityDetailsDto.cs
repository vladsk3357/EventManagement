namespace EventManagement.Application.Communities.Queries.GetCommunityDetails;

public sealed record CommunityDetailsDto(
    int Id, 
    string Name,
    string Location,
    string? ShortDescription,
    string? Description,
    int SubscriberCount,
    bool IsSubscribed,
    bool IsOrganizer,
    bool RequiresFormAnswer,
    int FormId,
    string? CommunityImageUrl);
