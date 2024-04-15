namespace EventManagement.Application.Common.Services.Documents;

public sealed record EventDocument(
    int Id,
    string Name,
    string Description,
    string Venue,
    int CommunityId);
