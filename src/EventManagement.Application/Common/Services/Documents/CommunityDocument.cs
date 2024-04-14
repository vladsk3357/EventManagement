namespace EventManagement.Infrastructure.Search.Documents;

public sealed record CommunityDocument(
    int Id,
    string Name,
    string? Description,
    string Location);
