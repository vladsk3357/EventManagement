namespace EventManagement.Application.Organizers.Speakers.Queries.GetSpeakers;

public sealed record GetSpeakersResult(ICollection<GetSpeakersSpeakerDto> Speakers);
