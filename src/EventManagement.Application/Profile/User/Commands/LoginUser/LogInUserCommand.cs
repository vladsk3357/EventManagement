using EventManagement.Application.Common.Exceptions;
using EventManagement.Application.Common.Interfaces;
using MediatR;

namespace EventManagement.Application.Profile.User.Commands.LoginUser;

public sealed record LoginUserCommand(string Email, string Password) : IRequest<LoginUserResultData>;

public sealed record LoginUserResultData(string AccessToken, string RefreshToken);

internal sealed class LoginUserCommandHandler : IRequestHandler<LoginUserCommand, LoginUserResultData>
{
    private readonly IIdentityService _identityService;

    public LoginUserCommandHandler(IIdentityService identityService)
    {
        _identityService = identityService;
    }

    public async Task<LoginUserResultData> Handle(LoginUserCommand request, CancellationToken cancellationToken)
    {
        var jwt = await _identityService.AuthenticateAsync(request.Email, request.Password, cancellationToken);
        if (jwt is null)
            throw new UnauthorizedRequestException();

        return new LoginUserResultData(jwt.AccessToken, jwt.RefreshToken);
    }
}
