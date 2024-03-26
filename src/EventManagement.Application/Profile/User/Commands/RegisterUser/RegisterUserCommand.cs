using EventManagement.Application.Common.Exceptions;
using EventManagement.Application.Common.Interfaces;
using EventManagement.Application.Common.Models.User;
using MediatR;

namespace EventManagement.Application.Profile.User.Commands.RegisterUser;

public sealed record RegisterUserCommand(string Name, string Email, string Password)
    : IRequest<RegisterUserResultData>;

public sealed record RegisterUserResultData(string Name, string Email, string AccessToken, string RefreshToken);

internal sealed class RegisterUserCommandHandler : IRequestHandler<RegisterUserCommand, RegisterUserResultData>
{
    private readonly IIdentityService _identityService;
    private readonly IUserService _userService;

    public RegisterUserCommandHandler(IIdentityService identityService, IUserService userService)
    {
        _identityService = identityService;
        _userService = userService;
    }

    public async Task<RegisterUserResultData> Handle(RegisterUserCommand request, CancellationToken cancellationToken)
    {
        var existingUser = await _userService.GetUserByEmailAsync(request.Email);
        if (existingUser is not null)
            throw new InvalidRequestException(nameof(request.Email), "Користувач з такою електронною поштою вже існує.");

        var userInput = new RegisterUserInput(request.Name, request.Email, request.Password);

        var registrationResult = await _identityService.RegisterUserAsync(userInput, cancellationToken);

        var user = registrationResult.User!;

        var jwt = await _identityService.AuthenticateAsync(request.Email, request.Password, cancellationToken);

        return new RegisterUserResultData(user.Name, user.Email, jwt!.AccessToken, jwt!.RefreshToken);
    }
}

