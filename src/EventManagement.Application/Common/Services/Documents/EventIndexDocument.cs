namespace EventManagement.Application.Common.Services.Documents;

public sealed record EventIndexDocument(
    int Id,
    string Name,
    string Description,
    int CommunityId,
    DateTime StartDate,
    DateTime EndDate,
    int AttendeesCount);
