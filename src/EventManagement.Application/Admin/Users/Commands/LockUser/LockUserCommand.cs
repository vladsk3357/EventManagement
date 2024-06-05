using EventManagement.Application.Admin.Common;
using EventManagement.Application.Common.Exceptions;
using EventManagement.Domain.Entities;
using MediatR;

namespace EventManagement.Application.Admin.Users.Commands.LockUser;

public sealed record LockUserCommand(string UserId, bool IsLocked) : IRequest;

internal sealed class LockUserCommandHandler(IAdminUserService userService) : IRequestHandler<LockUserCommand>
{
    private readonly IAdminUserService _userService = userService;

    public async Task Handle(LockUserCommand request, CancellationToken cancellationToken)
    {
        var user = await _userService.GetUserByIdAsync(request.UserId, cancellationToken)
            ?? throw new NotFoundException(nameof(User), request.UserId);

        await _userService.LockUser(request.UserId, request.IsLocked);
    }
}
