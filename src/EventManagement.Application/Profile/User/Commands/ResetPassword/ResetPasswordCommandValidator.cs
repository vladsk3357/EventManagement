using EventManagement.Application.Common.Interfaces;
using EventManagement.Application.Common.Validation;
using FluentValidation;

namespace EventManagement.Application.Profile.User.Commands.ResetPassword;

public sealed class ResetPasswordCommandValidator: AbstractValidator<ResetPasswordCommand>
{
    public ResetPasswordCommandValidator(IUserService userService)
    {
        RuleFor(x => x.Token)
            .NotEmpty().WithMessage("Токен є обов'язковий.");

        RuleFor(x => x.Email)
            .NotEmpty().WithMessage("Електронна пошта обов'язкова.")
            .EmailAddress().WithMessage("Електронна пошта не валідна.")
            .UserWithEmailMustExist(userService);

        RuleFor(x => x.Password)
            .NotEmpty().WithMessage("Пароль обов'язковий")
            .MinimumLength(6).WithMessage("Мінімальна довжина паролю 6 символів");
    }
}
