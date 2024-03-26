using EventManagement.Application.Profile.User.Commands.LoginUser;
using GraphQL;
using GraphQL.Resolvers;
using MediatR;

namespace EventManagement.WebApi.GraphApi.Profile.User.Resolvers;

public class LoginResolver : IFieldResolver
{
    private readonly IHttpContextAccessor _httpContextAccessor;

    public LoginResolver(IHttpContextAccessor httpContextAccessor)
    {
        _httpContextAccessor = httpContextAccessor;
    }

    public async ValueTask<object?> ResolveAsync(IResolveFieldContext context)
    {
        var mediator = _httpContextAccessor.HttpContext!.RequestServices.GetRequiredService<IMediator>();

        var command = context.GetArgument<LoginUserCommand>("input");
        var result = await mediator.Send(command, context.CancellationToken);

        return result;
        //return result.IsSuccess ? result.Value : result.Errors;
    }
}
