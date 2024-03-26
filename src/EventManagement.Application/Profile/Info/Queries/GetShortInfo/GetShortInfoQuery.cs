using EventManagement.Application.Common.Interfaces;
using FluentResults;
using MediatR;

namespace EventManagement.Application.Profile.Info.Queries.GetShortInfo;

public sealed record GetShortInfoQuery() : IRequest<ProfileInfoDto>;

internal sealed class GetShortInfoQueryHandler : IRequestHandler<GetShortInfoQuery, ProfileInfoDto>
{
    private readonly IUserService _userService;
    private readonly ICurrentUserAccessor _currentUserAccessor;

    public GetShortInfoQueryHandler(IUserService userService, ICurrentUserAccessor currentUserAccessor)
    {
        _userService = userService;
        _currentUserAccessor = currentUserAccessor;
    }

    public async Task<ProfileInfoDto> Handle(GetShortInfoQuery request, CancellationToken cancellationToken)
    {
        var user = await _userService.GetUserByIdAsync(_currentUserAccessor.UserId, cancellationToken);
        return user!.ToDto();
    }
}
