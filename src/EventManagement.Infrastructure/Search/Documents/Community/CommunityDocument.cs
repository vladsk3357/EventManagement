namespace EventManagement.Infrastructure.Search.Documents;

public sealed record CommunityDocument(
    int Id,
    string Name,
    string NameSuggestion,
    string? Description,
    string Location,
    string Domain,
    int SubscribersCount);
