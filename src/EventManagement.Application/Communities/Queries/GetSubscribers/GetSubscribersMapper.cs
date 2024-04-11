using EventManagement.Domain.Entities;

namespace EventManagement.Application.Communities.Queries.GetSubscribers;

internal static class GetSubscribersMapper
{
    public static SubscriberDto ToDto(this User user) => new(user.Id!, user.Name);
}
