using EventManagement.Application.Common.Interfaces;
using MediatR;

namespace EventManagement.Application.Profile.User.Commands.ConfirmEmail;

public sealed record ConfirmEmailCommand(string Token, string Email) : IRequest<bool>;

internal sealed class ConfirmEmailCommandHandler : IRequestHandler<ConfirmEmailCommand, bool>
{
    private readonly IIdentityService _identityService;

    public ConfirmEmailCommandHandler(IIdentityService identityService)
    {
        _identityService = identityService;
    }

    public async Task<bool> Handle(ConfirmEmailCommand request, CancellationToken cancellationToken)
    {
        return await _identityService.ConfirmEmailAsync(request.Token, request.Email, cancellationToken);
    }
}
