namespace EventManagement.Infrastructure.Search.Documents.Community;

internal sealed class UpdateSubscribersCountDocument(int subscribersCount)
{
    public int SubscribersCount { get; } = subscribersCount;
}
