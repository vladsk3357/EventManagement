using EventManagement.Application.Profile.User.Commands.RegisterUser;
using GraphQL.Types;

namespace EventManagement.WebApi.GraphApi.Profile.User.Types;

public sealed class RegisterInputType : InputObjectGraphType<RegisterUserCommand>
{
    public RegisterInputType()
    {
        Name = "RegisterUserInput";
        Field(x => x.Email);
        Field(x => x.Password);
        Field(x => x.Name);
    }
}
