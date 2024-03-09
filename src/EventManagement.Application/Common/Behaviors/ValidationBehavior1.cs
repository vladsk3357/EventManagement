using EventManagement.Application.Common.Errors;
using FluentResults;
using FluentValidation;
using MediatR;
using ValidationException = EventManagement.Application.Common.Exceptions.ValidationException;


namespace EventManagement.Application.Common.Behaviors;

//internal class ValidationBehavior1<TRequest, TResponse> : IPipelineBehavior<TRequest, TResponse>
//     where TRequest : notnull
//{
//    private readonly IEnumerable<IValidator<TRequest>> _validators;

//    public ValidationBehavior1(IEnumerable<IValidator<TRequest>> validators)
//    {
//        _validators = validators;
//    }

//    public async Task<TResponse> Handle(TRequest request, RequestHandlerDelegate<TResponse> next, CancellationToken cancellationToken)
//    {
//        if (_validators.Any())
//        {
//            var context = new ValidationContext<TRequest>(request);

//            var validationResults = await Task.WhenAll(
//                _validators.Select(v =>
//                    v.ValidateAsync(context, cancellationToken)));

//            var failures = validationResults
//                .Where(r => r.Errors.Any())
//                .SelectMany(r => r.Errors)
//                .ToList();

//            if (failures.Any())
//            {
//                if (typeof(TResponse).GetGenericTypeDefinition() == typeof(Result<>))
//                {
//                    var responseParameterType = typeof(TResponse).GetGenericArguments()[0];
//                    var responseType = typeof(Result<>).MakeGenericType(responseParameterType);

//                    var result = Activator.CreateInstance(responseType)!;

//                    var method = responseType.GetMethod("WithError", new[] { typeof(Error) })!;
//                    return (TResponse)method.Invoke(result, new[] { new ValidationError(failures) })!;
//                }
//                else
//                {
//                    throw new ValidationException(failures);
//                }
//            }
//        }
//        return await next();
//    }
//}
