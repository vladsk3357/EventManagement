using EventManagement.Domain.Entities;

namespace EventManagement.Application.Organizers.Speakers.Queries.GetSpeakers;

internal static class GetSpeakersQueryMapper
{
    public static GetSpeakersSpeakerDto ToDto(this Speaker speaker) => new(
            speaker.Id,
            speaker.Name,
            speaker.Title,
            speaker.Company,
            speaker.Bio);
}
