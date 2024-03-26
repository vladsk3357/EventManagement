using EventManagement.Application.Profile.User.Commands.RegisterUser;
using EventManagement.WebApi.GraphApi.Profile.User.Types;
using GraphQL;
using GraphQL.Types;
using EventManagement.WebApi.GraphApi.Profile.User.Resolvers;
using MediatR;
using EventManagement.Application.Profile.User.Commands.RequestResetPassword;

namespace EventManagement.WebApi.GraphApi.Profile.User;

public class UserFieldBuilder
{
    private readonly RegisterResolver _registerResolver;
    private readonly LoginResolver _loginResolver;
    private readonly IHttpContextAccessor _httpContextAccessor;

    public UserFieldBuilder(RegisterResolver registerResolver, LoginResolver loginResolver, IHttpContextAccessor httpContextAccessor)
    {
        _registerResolver = registerResolver;
        _loginResolver = loginResolver;
        _httpContextAccessor = httpContextAccessor;
    }

    public void AddRegistrationField(ObjectGraphType mutation)
    {
        mutation.Field<RegisterResultDataType>("Register")
            .Argument<NonNullGraphType<RegisterInputType>>("input")
            .Resolve(_registerResolver);
    }

    public void AddLoginField(ObjectGraphType mutation)
    {
        mutation.Field<LoginResultDataType>("Login")
            .Argument<NonNullGraphType<LoginInputType>>("input")
            .Resolve(_loginResolver);
    }

    public void AddRequestResetPassword(ObjectGraphType mutation)
    {
        mutation.Field<BooleanGraphType>("RequestResetPassword")
            .Argument<NonNullGraphType<RequestResetPasswordInputType>>("input")
            .ResolveAsync(async context =>
            {
                var mediator = _httpContextAccessor.HttpContext!.RequestServices.GetRequiredService<IMediator>();

                var command = context.GetArgument<RequestResetPasswordCommand>("input");
                //var result = await mediator.Send(command, context.CancellationToken);

                //return result.IsSuccess ? true : result.Errors;
                return null;
            });
    }
}
