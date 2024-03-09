namespace EventManagement.Application.Organizers.Sessions.Queries.GetSessions;

public sealed record SessionDto(
    int Id,
    string Title,
    DateTime StartTime,
    DateTime EndTime,
    TimeSpan Duration,
    ICollection<GetSessionsSpeakerDto> Speakers);
