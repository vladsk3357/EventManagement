using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using EventManagement.Application.Admin.Common;
using EventManagement.Application.Common.Interfaces;
using MediatR;

namespace EventManagement.Application.Admin.Account.Commands.Login;

public sealed record LogInCommand(string Email, string Password) : IRequest<bool>;

internal sealed class LoginCommandHandler(IAdminIdentityService identityService) 
    : IRequestHandler<LogInCommand, bool>
{
    private readonly IAdminIdentityService _identityService = identityService;

    public async Task<bool> Handle(LogInCommand request, CancellationToken cancellationToken)
    {
        return await _identityService.SignInAsync(request.Email, request.Password, "Admin", cancellationToken);
    }
}
