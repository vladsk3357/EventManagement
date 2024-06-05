using EventManagement.Domain.Entities.Community;

namespace EventManagement.Application.Organizers.Communities.Commands.CreateCommunity;

internal static class CreateCommunityCommandMapper
{
    public static Community ToEntity(this CreateCommunityCommand command) => new()
    {
        Name = command.Name,
        Domain = command.Domain,
        Location = command.Location,
    };
}
