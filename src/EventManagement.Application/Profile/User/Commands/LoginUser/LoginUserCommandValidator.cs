using EventManagement.Application.Common.Interfaces;
using EventManagement.Application.Common.Validation;
using FluentValidation;

namespace EventManagement.Application.Profile.User.Commands.LoginUser;

internal sealed class LoginUserCommandValidator : AbstractValidator<LoginUserCommand>
{
    public LoginUserCommandValidator(IUserService userService)
    {
        RuleFor(x => x.Email)
            .NotEmpty().WithMessage("Електронна пошта обов'язкове")
            .EmailAddress().WithMessage("Значення має бути коректною електронною поштою")
            .UniqueEmail(userService);

        RuleFor(x => x.Password)
            .NotEmpty().WithMessage("Пароль обов'язковий");
    }
}
