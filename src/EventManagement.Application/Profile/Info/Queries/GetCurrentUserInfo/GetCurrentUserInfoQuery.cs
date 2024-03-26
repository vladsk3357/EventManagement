using EventManagement.Application.Common.Interfaces;
using EventManagement.Application.Common.Security;
using MediatR;

namespace EventManagement.Application.Profile.Info.Queries.GetCurrentUserInfo;

[Authorize]
public sealed record GetCurrentUserInfoQuery : IRequest<GetCurrentUserInfoDto>;

internal sealed class GetCurrentUserInfoQueryHandler : IRequestHandler<GetCurrentUserInfoQuery, GetCurrentUserInfoDto>
{
    private readonly ICurrentUserAccessor _currentUserAccessor;
    private readonly IUserService _userService;

    public GetCurrentUserInfoQueryHandler(ICurrentUserAccessor currentUserAccessor, IUserService userService)
    {
        _currentUserAccessor = currentUserAccessor;
        _userService = userService;
    }

    public async Task<GetCurrentUserInfoDto> Handle(GetCurrentUserInfoQuery request, CancellationToken cancellationToken)
    {
        var user = await _userService.GetUserByIdAsync(_currentUserAccessor.UserId, cancellationToken)
            ?? throw new UnauthorizedAccessException();

       return user.ToDto();
    }
}

