using EventManagement.Domain.Entities;

namespace EventManagement.Application.Organizers.Sessions.Queries.GetSessions;

internal static class GetSessionsQueryMapper
{
    public static SessionDto ToDto(this Session session) => new(
        session.Id,
        session.Title,
        session.StartTime,
        session.EndTime,
        session.Duration.TotalMinutes,
        session.Description,
        session.Speakers.Select(s => s.ToDto()).ToList(),
        session.Level);

    public static GetSessionsSpeakerDto ToDto(this Speaker speaker) => new(speaker.Id, speaker.Name);
}
