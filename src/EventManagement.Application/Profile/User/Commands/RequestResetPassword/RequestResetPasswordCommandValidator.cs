using EventManagement.Application.Common.Interfaces;
using EventManagement.Application.Common.Validation;
using FluentValidation;

namespace EventManagement.Application.Profile.User.Commands.RequestResetPassword;

public sealed class RequestResetPasswordCommandValidator : AbstractValidator<RequestResetPasswordCommand>
{
    public RequestResetPasswordCommandValidator(IUserService userService)
    {
        RuleFor(x => x.Email)
            .NotEmpty().WithMessage("Email обов'язковий")
            .EmailAddress().WithMessage("Email неправильний")
            .UserWithEmailMustExist(userService);
    }
}
