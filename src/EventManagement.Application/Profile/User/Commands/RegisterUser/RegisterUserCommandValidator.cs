using FluentValidation;

namespace EventManagement.Application.Profile.User.Commands.RegisterUser;

public sealed class RegisterUserCommandValidator : AbstractValidator<RegisterUserCommand>
{
    public RegisterUserCommandValidator()
    {
        RuleFor(x => x.Email)
            .NotEmpty().WithMessage("Електронна пошта обов'язкове")
            .EmailAddress().WithMessage("Значення має бути коректною електронною поштою");

        RuleFor(x => x.Password)
            .NotEmpty().WithMessage("Пароль обов'язковий")
            .MinimumLength(6).WithMessage("Мінімальна довжина паролю 6 символів");

        RuleFor(x => x.Name)
            .NotEmpty().WithMessage("Ім'я обов'язкове")
            .MinimumLength(3).WithMessage("Мінімальна довжина імені 3 символи")
            .Matches(@"\S+");

    }
}
