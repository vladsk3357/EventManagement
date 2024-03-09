using EventManagement.Application.Common.Interfaces;
using FluentValidation;

namespace EventManagement.Application.Profile.Info.Commands.EditInfo;

internal sealed class EditInfoCommandValidator : AbstractValidator<EditInfoCommand>
{

    public EditInfoCommandValidator(IDateTime dateTime)
    {
        RuleFor(x => x.PhoneNumber)
            .NotEmpty().WithMessage("Номер телефону обов'язковий");

        RuleFor(x => x.Name)
            .NotEmpty().WithMessage("Ім'я обов'язкове")
            .MaximumLength(100).WithMessage("Ім'я не може бути більше 100 символів");

        RuleFor(x => x.Birthday)
            .NotEmpty().WithMessage("Дата народження обов'язкова")
            .LessThanOrEqualTo(DateOnly.FromDateTime(dateTime.Now)).WithMessage("Дата народження має бути в минулому");

        RuleFor(x => x.Location)
            .NotEmpty().WithMessage("Поточна локація обов'язкова");

        RuleFor(x => x.Information)
            .MaximumLength(500).WithMessage("Інформація не може бути більше 500 символів");
    }
}
