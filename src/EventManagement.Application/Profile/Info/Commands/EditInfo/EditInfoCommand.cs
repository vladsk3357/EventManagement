using EventManagement.Application.Common.Interfaces;
using MediatR;

namespace EventManagement.Application.Profile.Info.Commands.EditInfo;

public sealed record EditInfoCommand(
    string UserName,
    string PhoneNumber,
    string Name,
    DateOnly Birthday,
    string Location,
    string Information,
    string Email) : IRequest<EditInfoResult>;

internal sealed class EditInfoCommandHandler : IRequestHandler<EditInfoCommand, EditInfoResult>
{
    private readonly ICurrentUserAccessor _currentUserAccessor;
    private readonly IUserService _userService;
    private readonly IApplicationDbContext _context;

    public EditInfoCommandHandler(ICurrentUserAccessor currentUserAccessor, IUserService userService, IApplicationDbContext context)
    {
        _currentUserAccessor = currentUserAccessor;
        _userService = userService;
        _context = context;
    }

    public async Task<EditInfoResult> Handle(EditInfoCommand request, CancellationToken cancellationToken)
    {
        var user = request.ToEntity();
        user.Id = _currentUserAccessor.UserId;
        var updatedUser = await _userService.UpdateUserInfoAsync(user, cancellationToken);
        return updatedUser.ToDto();
    }
}
