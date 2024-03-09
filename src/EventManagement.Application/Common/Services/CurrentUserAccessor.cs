using EventManagement.Application.Common.Interfaces;

namespace EventManagement.Application.Common.Services;

internal sealed class CurrentUserAccessor : ICurrentUserAccessor
{
    private readonly ICurrentUserService _currentUserService;

    public CurrentUserAccessor(ICurrentUserService currentUserService)
    {
        _currentUserService = currentUserService;
    }

    public string UserId => _currentUserService.UserId ?? throw new UnauthorizedAccessException();
}
