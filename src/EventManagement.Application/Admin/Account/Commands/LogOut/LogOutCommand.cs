using EventManagement.Application.Admin.Common;
using EventManagement.Application.Common.Security;
using MediatR;

namespace EventManagement.Application.Admin.Account.Commands.LogOut;

[Authorize(Roles = "Admin")]
public sealed record LogOutCommand() : IRequest;

internal sealed class LogOutCommandHandler(IAdminIdentityService adminIdentityService) 
    : IRequestHandler<LogOutCommand>
{
    private readonly IAdminIdentityService _adminIdentityService = adminIdentityService;

    async Task IRequestHandler<LogOutCommand>.Handle(LogOutCommand request, CancellationToken cancellationToken)
    {
        await _adminIdentityService.SignOutAsync();
    }
}
