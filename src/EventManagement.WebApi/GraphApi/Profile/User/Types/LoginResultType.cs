using EventManagement.Application.Profile.User.Commands.LoginUser;
using GraphQL.Types;

namespace EventManagement.WebApi.GraphApi.Profile.User;

public sealed class LoginResultType : ObjectGraphType<LoginUserResultData>
{
    public LoginResultType()
    {
        Field(x => x.AccessToken)
            .Description("The JWT token that can be used for authentication.");
    }
}

public sealed class LoginResultDataType : ObjectGraphType<LoginUserResultData>
{
    public LoginResultDataType()
    {
        Field(x => x.AccessToken)
            .Description("The JWT token that can be used for authentication.");
    }
}
