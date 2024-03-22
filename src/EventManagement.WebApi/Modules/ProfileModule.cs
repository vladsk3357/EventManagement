using Carter;
using EventManagement.Application.Profile.User.Commands.RegisterUser;
using MediatR;

namespace EventManagement.WebApi.Modules;

public class ProfileModule : ModuleBase
{
    public ProfileModule() : base("profile")
    {
        
    }
    public override void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapPost("/register", async (RegisterUserCommand command, ISender sender) =>
        {
            return await sender.Send(command);
        });
    }
}
