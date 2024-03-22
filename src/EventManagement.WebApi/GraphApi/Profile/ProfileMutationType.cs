using EventManagement.WebApi.GraphApi.Profile.User;
using GraphQL.Types;

namespace EventManagement.WebApi.GraphApi.Profile;

public class ProfileMutationType : ObjectGraphType
{
    public ProfileMutationType(UserFieldBuilder userFieldBuilder)
    {
        userFieldBuilder.AddRegistrationField(this);
        userFieldBuilder.AddLoginField(this);
        userFieldBuilder.AddRequestResetPassword(this);
    }
}
