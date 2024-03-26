using EventManagement.Application.Common.Interfaces;
using MediatR;

namespace EventManagement.Application.Profile.User.Commands.ResetPassword;

public sealed record ResetPasswordCommand(string Email, string Password, string Token) : IRequest<bool>;

internal sealed class ResetPasswordCommandHandler : IRequestHandler<ResetPasswordCommand, bool>
{
    private readonly IIdentityService _identityService;

    public ResetPasswordCommandHandler(IIdentityService identityService)
    {
        _identityService = identityService;
    }

    public async Task<bool> Handle(ResetPasswordCommand request, CancellationToken cancellationToken)
    {
        var (email, password, token) = request;
        return await _identityService.ResetPasswordAsync(email, password, token);
    }
}
