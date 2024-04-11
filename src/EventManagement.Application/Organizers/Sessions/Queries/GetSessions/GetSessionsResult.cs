namespace EventManagement.Application.Organizers.Sessions.Queries.GetSessions;

public sealed record GetSessionsResult(ICollection<SessionDto> Sessions);
