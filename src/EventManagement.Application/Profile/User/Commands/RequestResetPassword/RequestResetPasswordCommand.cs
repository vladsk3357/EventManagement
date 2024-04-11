using EventManagement.Application.Common.Interfaces;
using EventManagement.Application.Common.MailTemplateModels;
using FluentResults;
using MediatR;

namespace EventManagement.Application.Profile.User.Commands.RequestResetPassword;

public sealed record RequestResetPasswordCommand(string Email) : IRequest;

internal sealed class RequestResetPasswordCommandHandler : IRequestHandler<RequestResetPasswordCommand>
{
    private readonly IUserService _userService;
    private readonly IIdentityService _identityService;
    private readonly ILinksService _linksService;
    private readonly IMailService _mailService;

    public RequestResetPasswordCommandHandler(
        IUserService userService, 
        IIdentityService identityService, 
        ILinksService linksService, 
        IMailService mailService)
    {
        _userService = userService;
        _identityService = identityService;
        _linksService = linksService;
        _mailService = mailService;
    }

    public async Task Handle(RequestResetPasswordCommand request, CancellationToken cancellationToken)
    {
        var email = request.Email;
        var user = await _userService.GetUserByEmailAsync(email);
        if (user is null)
            return;

        var token = await _identityService.GenerateResetPasswordTokenAsync(email, cancellationToken);
        var link = _linksService.GenerateResetPasswordLink(token, email);
        var model = new ResetPasswordMailTemplateModel(user.Name, link);

        await _mailService.SendResetPasswordMailAsync(email, model, cancellationToken);
    }
}
