using EventManagement.Application.Common.Models.User;
using EventManagement.Application.Profile.User.Commands.LoginUser;
using EventManagement.Application.Profile.User.Commands.RefreshToken;
using EventManagement.Application.Profile.User.Commands.RegisterUser;
using EventManagement.Application.Profile.User.Commands.RequestResetPassword;
using Microsoft.AspNetCore.Mvc;

namespace EventManagement.WebApi.Controllers;

public class ProfileUserController : ApiControllerBase
{
    [HttpPost("register")]
    public async Task<RegisterUserResultData> Register(RegisterUserCommand command)
    {
        return await Mediator.Send(command);
    }

    [HttpPost("login")]
    public async Task<LoginUserResultData> Login(LoginUserCommand command)
    {
        return await Mediator.Send(command);
    }

    [HttpPost("request-reset-password")]
    public async Task<ActionResult> RequestResetPassword(RequestResetPasswordCommand command)
    {
        await Mediator.Send(command);

        return Ok();
    }

    [HttpPost("refresh-token")]
    public async Task<AuthToken> RefreshToken(RefreshTokenCommand command)
    {
        return await Mediator.Send(command);
    }
}
