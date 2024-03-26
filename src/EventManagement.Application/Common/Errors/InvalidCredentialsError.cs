using FluentResults;

namespace EventManagement.Application.Common.Errors;

public class InvalidCredentialsError : Error
{
    public InvalidCredentialsError()
        : base("Облікова дані неправильні.")
    {
    }
}
