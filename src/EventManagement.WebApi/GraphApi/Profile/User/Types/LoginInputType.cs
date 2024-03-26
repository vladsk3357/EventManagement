using EventManagement.Application.Profile.User.Commands.LoginUser;
using GraphQL.Types;

namespace EventManagement.WebApi.GraphApi.Profile.User.Types;

public sealed class LoginInputType : InputObjectGraphType<LoginUserCommand>
{
    public LoginInputType()
    {
        Name = "LoginUserInput";

        Field(x => x.Email);
        Field(x => x.Password);
    }
}
