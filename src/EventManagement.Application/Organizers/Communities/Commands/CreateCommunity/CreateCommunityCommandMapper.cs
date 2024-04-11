namespace EventManagement.Application.Organizers.Communities.Commands.CreateCommunity;

using Community = Domain.Entities.Community;

internal static class CreateCommunityCommandMapper
{
    public static Community ToEntity(this CreateCommunityCommand command) => new()
    {
        Name = command.Name,
        Domain = command.Domain,
        Location = command.Location,
    };
}
