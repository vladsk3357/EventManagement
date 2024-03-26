using EventManagement.Application.Profile.User.Commands.RequestResetPassword;
using GraphQL.Types;

namespace EventManagement.WebApi.GraphApi.Profile.User.Types;

public sealed class RequestResetPasswordInputType : InputObjectGraphType<RequestResetPasswordCommand>
{
    public RequestResetPasswordInputType()
    {
        Name = "RequestResetPasswordInput";

        Field(x => x.Email);
    }
}
