using FluentResults;

namespace EventManagement.Application.Common.Errors;

public class UnauthorizedError : Error
{
    public UnauthorizedError() : base("Потрібно авторизуватися.")
    {
    }
}
