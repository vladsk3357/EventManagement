namespace EventManagement.Infrastructure.Search.Documents.Event;

public sealed record EventDocument(
    int Id,
    string Name,
    string Description,
    string Venue,
    int CommunityId,
    DateTime StartDate,
    DateTime EndDate,
    int AttendeesCount);
