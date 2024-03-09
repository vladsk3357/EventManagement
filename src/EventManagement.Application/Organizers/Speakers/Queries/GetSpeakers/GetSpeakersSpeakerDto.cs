namespace EventManagement.Application.Organizers.Speakers.Queries.GetSpeakers;

public sealed record GetSpeakersSpeakerDto(
    int Id,
    string Name,
    string Title,
    string Company,
    string Bio);
