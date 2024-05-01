namespace EventManagement.Application.Common.Services.Documents;

public sealed record CommunityIndexDocument(
    int Id,
    string Name,
    string? Description,
    string Location,
    string Domain,
    int SubscribersCount);
