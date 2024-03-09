using EventManagement.Application.Common.Errors;
using EventManagement.Application.Common.Interfaces;
using FluentValidation;

namespace EventManagement.Application.Common.Validation;

internal static class CustomValidators
{
    public static IRuleBuilderOptions<T, string> UniqueEmail<T>(this IRuleBuilder<T, string> ruleBuilder, IUserService userService)
    {
        return ruleBuilder.MustAsync(async (email, cancellationToken) 
            => !await userService.IsEmailTakenAsync(email, cancellationToken))
            .WithMessage("Email is already used")
            .WithErrorCode(ValidationErrorCodes.NotUniqueEmail);
    }

    public static IRuleBuilderOptions<T, string> UserWithEmailMustExist<T>(this IRuleBuilder<T, string> ruleBuilder, IUserService userService)
    {
        return ruleBuilder.MustAsync(userService.IsEmailTakenAsync)
            .WithMessage("User with the email does not exist")
            .WithErrorCode(ValidationErrorCodes.NonExistingUserEmail);
    }
}