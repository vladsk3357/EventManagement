using EventManagement.Application.Common.Models;
using EventManagement.Application.Profile.User.Commands.RegisterUser;
using GraphQL.Types;

namespace EventManagement.WebApi.GraphApi.Profile.User.Types;

public sealed class RegisterResultType : ObjectGraphType<Result<RegisterUserResultData>>
{
    public RegisterResultType()
    {
        Field(x => x.Succeeded)
            .Description("Indicates whether the operation was successful.");

        Field(x => x.Errors, nullable: true)
            .Description("The error message if the operation failed.");

        Field(x => x.Data, nullable: true, type: typeof(RegisterResultDataType))
            .Description("The data that was returned.");
    }
}

public sealed class RegisterResultDataType : ObjectGraphType<RegisterUserResultData>
{
    public RegisterResultDataType()
    {
        Field(x => x.Name)
            .Description("The name of the user.");

        Field(x => x.Email)
            .Description("The email address of the user.");

        Field(x => x.AccessToken)
            .Description("The JWT token that can be used for authentication.");
    }
}

