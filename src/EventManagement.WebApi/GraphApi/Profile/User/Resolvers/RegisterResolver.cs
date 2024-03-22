using EventManagement.Application.Profile.User.Commands.RegisterUser;
using GraphQL;
using GraphQL.Resolvers;
using MediatR;

namespace EventManagement.WebApi.GraphApi.Profile.User.Resolvers;

public class RegisterResolver : IFieldResolver
{
    private readonly IHttpContextAccessor _httpContextAccessor;

    public RegisterResolver(IHttpContextAccessor httpContextAccessor)
    {
        _httpContextAccessor = httpContextAccessor;
    }

    public async ValueTask<object?> ResolveAsync(IResolveFieldContext context)
    {
        var mediator = _httpContextAccessor.HttpContext!.RequestServices.GetRequiredService<IMediator>();

        var command = context.GetArgument<RegisterUserCommand>("input");
        var result = await mediator.Send(command, context.CancellationToken);

        return null;
        //return result.IsSuccess ? result.Value : result.Errors;
    }
}
