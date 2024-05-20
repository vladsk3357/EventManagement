using FluentValidation;

namespace EventManagement.Application.Profile.Info.Commands.EditInfo;

internal sealed class EditInfoCommandValidator : AbstractValidator<EditInfoCommand>
{
    public EditInfoCommandValidator()
    {
        RuleFor(x => x.UserName)
            .NotEmpty().WithMessage("Ім'я користувача обов'язкове")
            .MaximumLength(100).WithMessage("Ім'я користувача не може бути більше 100 символів")
            .Matches("^[a-zA-Z0-9_]+$").WithMessage("Ім'я користувача може містити тільки латинські літери, цифри та символ \"_\"");

        RuleFor(x => x.Name)
            .NotEmpty().WithMessage("Ім'я обов'язкове")
            .MaximumLength(100).WithMessage("Ім'я не може бути більше 100 символів");

        RuleFor(x => x.Location)
            .NotEmpty().WithMessage("Поточна локація обов'язкова");

        RuleFor(x => x.Information)
            .MaximumLength(500).WithMessage("Інформація не може бути більше 500 символів");
    }
}
