using EventManagement.Application.Common.Exceptions;
using EventManagement.Application.Common.Interfaces;
using EventManagement.Application.Common.Models.User;
using MediatR;

namespace EventManagement.Application.Profile.User.Commands.RefreshToken;

public sealed record RefreshTokenCommand(string Token, string RefreshToken) : IRequest<AuthToken>;

internal sealed class RefreshTokenCommandHandler : IRequestHandler<RefreshTokenCommand, AuthToken>
{
    private readonly IIdentityService _identityService;

    public RefreshTokenCommandHandler(IIdentityService identityService)
    {
        _identityService = identityService;
    }

    public async Task<AuthToken> Handle(RefreshTokenCommand request, CancellationToken cancellationToken)
    {
        try
        {
            return await _identityService.RefreshTokenAsync(request.Token, request.RefreshToken, cancellationToken);
        }
        catch (Exception)
        {
            throw new InvalidRequestException(nameof(request.RefreshToken), "Токен оновлення неправильний.");
        }
    }
}
