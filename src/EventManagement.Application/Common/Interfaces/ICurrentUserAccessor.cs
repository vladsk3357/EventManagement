namespace EventManagement.Application.Common.Interfaces;

internal interface ICurrentUserAccessor
{
    string UserId { get; }
}
