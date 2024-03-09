using EventManagement.Domain.Entities;

namespace EventManagement.Domain.Events;

public class UserInfoUpdatedEvent : DomainEvent
{
    public UserInfoUpdatedEvent(UserInfo userInfo) => UserInfo = userInfo;

    public UserInfo UserInfo { get; }
}
