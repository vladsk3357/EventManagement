using EventManagement.Application.Common.Errors;
using EventManagement.WebApi.GraphApi.Common.Errors;
using FluentResults;
using GraphQL;
using GraphQL.Instrumentation;

namespace EventManagement.WebApi.GraphApi.Common.FieldMiddlewares;

public class ErrorHandlerFieldMiddleware : IFieldMiddleware
{
    private readonly IDictionary<Type, Action<IError, IResolveFieldContext>> _errorHandlers;

    public ErrorHandlerFieldMiddleware()
    {
        _errorHandlers = new Dictionary<Type, Action<IError, IResolveFieldContext>>
        {
            { typeof(ValidationError), HandleValidationError }
        };
    }

    public async ValueTask<object?> ResolveAsync(IResolveFieldContext context, FieldMiddlewareDelegate next)
    {
        try
        {
            var result = await next(context);

            if (result is List<IError> errors)
            {
                foreach (var error in errors)
                {
                    var type = error.GetType();

                    if (_errorHandlers.TryGetValue(type, out var handler))
                        handler(error, context);
                    else
                        HandleUnknownError(error, context);
                }
                return null;
            }

            return result;
        }
        catch (Exception ex)
        {
            HandleUnknownError(ex, context);
            return null;
        }
    }

    private static void HandleValidationError(IError error, IResolveFieldContext context)
    {
        var validationError = (ValidationError)error;

        foreach (var failure in validationError.Reasons)
        {
            context.Errors.Add(new GraphQLValidationError(failure.Message));
        }
    }

    private static void HandleUnknownError(IError error, IResolveFieldContext context)
    {
        context.Errors.Add(new ExecutionError(error.Message) { Code = "UNHANDLED_ERROR" });
    }

    private static void HandleUnknownError(Exception exception, IResolveFieldContext context)
    {
        context.Errors.Add(new ExecutionError(exception.Message) { Code = "UNHANDLED_ERROR" });
    }
}
