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
    private readonly IFileStorageService _fileStorageService;

    public GetCurrentUserInfoQueryHandler(ICurrentUserAccessor currentUserAccessor, IUserService userService, IFileStorageService fileStorageService)
    {
        _currentUserAccessor = currentUserAccessor;
        _userService = userService;
        _fileStorageService = fileStorageService;
    }

    public async Task<GetCurrentUserInfoDto> Handle(GetCurrentUserInfoQuery request, CancellationToken cancellationToken)
    {
        var user = await _userService.GetUserByIdAsync(_currentUserAccessor.UserId, cancellationToken)
            ?? throw new UnauthorizedAccessException();

        if (user.ProfileImage is not null)
        {
            var imageUrl = await _fileStorageService.GetFileUrlAsync(user.ProfileImage, cancellationToken);
            return user.ToDto(imageUrl.ToString());
        }

        return user.ToDto(null);
    }
}
