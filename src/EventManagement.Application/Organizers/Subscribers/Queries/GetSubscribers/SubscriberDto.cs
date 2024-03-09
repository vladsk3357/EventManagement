namespace EventManagement.Application.Organizers.Subscribers.Queries.GetSubscribers;

public sealed record SubscriberDto(
    int Id, 
    string UserName, 
    string Name, 
    DateTime JoinDate);
