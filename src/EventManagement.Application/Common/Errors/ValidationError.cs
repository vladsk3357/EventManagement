using FluentResults;
using FluentValidation.Results;

namespace EventManagement.Application.Common.Errors;

public class ValidationError : Error
{
    public ValidationError(string message = "One or more validation failures have occurred.")
        : base(message)
    {
        //Errors = new Dictionary<string, string[]>();
    }

    //public ValidationError(IEnumerable<ValidationFailure> failures)
    //        : this()
    //{
    //    Errors = failures
    //        .GroupBy(e => e.PropertyName, e => e.ErrorMessage)
    //        .ToDictionary(failureGroup => failureGroup.Key, failureGroup => failureGroup.ToArray());
    //}

    public ValidationError(ValidationFailure validationFailure)
        : base(validationFailure.ErrorMessage)
    {
        //ErrorCode = errorCode;
        ErrorCode = validationFailure.ErrorCode;
    }

    public string ErrorCode { get; }

    //public IDictionary<string, string[]> Errors { get; }
}

public static class ValidationErrorCodes
{
    public const string InvalidFormat = "INVALID_FORMAT";

    public const string NotUniqueEmail = "NOT_UNIQUE_EMAIL";

    public const string NonExistingUserEmail = "NON_EXISING_USER_EMAIL";
}
