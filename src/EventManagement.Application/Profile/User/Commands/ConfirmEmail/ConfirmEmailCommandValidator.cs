using EventManagement.Application.Common.Interfaces;
using EventManagement.Application.Common.Validation;
using FluentValidation;

namespace EventManagement.Application.Profile.User.Commands.ConfirmEmail;

internal sealed class ConfirmEmailCommandValidator : AbstractValidator<ConfirmEmailCommand>
{
    public ConfirmEmailCommandValidator(IUserService userService)
    {
        RuleFor(x => x.Token)
            .NotEmpty().WithMessage("Токен є обов'язковий.");

        RuleFor(x => x.Email)
            .NotEmpty().WithMessage("Електронна пошта обов'язкова.")
            .EmailAddress().WithMessage("Електронна пошта не валідна.")
            .UserWithEmailMustExist(userService);
    }
}
