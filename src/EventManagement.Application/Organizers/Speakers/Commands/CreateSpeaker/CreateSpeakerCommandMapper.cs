namespace EventManagement.Application.Organizers.Speakers.Commands.CreateSpeaker;

internal static class CreateSpeakerCommandMapper
{
    public static Domain.Entities.Speaker ToEntity(this CreateSpeakerCommand command)
    {
        return new()
        {
           Name = command.Name,
           Title = command.Title,
           Company = command.Company,
           Bio = command.Bio,
           EventId = command.EventId,
        };
    }
}
