namespace EventManagement.Application.Organizers.Subscribers.Queries.GetSubscribers;

public sealed record SubscriberDto(
    string Id, 
    string UserName, 
    string Name, 
    DateTime JoinDate);
