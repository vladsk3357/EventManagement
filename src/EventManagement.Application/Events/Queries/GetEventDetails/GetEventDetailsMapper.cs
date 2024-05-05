using EventManagement.Application.Common.Models.Event;
using EventManagement.Domain.Entities;
using EventManagement.Domain.Entities.CommunityEvent;

namespace EventManagement.Application.Events.Queries.GetEventDetails;

internal static class GetEventDetailsMapper
{
    public static GetEventDetailsDto ToDto(
        this Event entity, 
        int attendeesCount, 
        bool isAttendable, 
        AttendeeStatus? attendeeStatus, 
        bool isOrganizer,
        List<string> imagesUrls)
    {
        return new GetEventDetailsDto(
            entity.Id,
            entity.Name,
            entity.Description,
            entity.StartDate,
            entity.EndDate,
            entity.Venue.ToDto(),
            attendeesCount,
            isAttendable,
            attendeeStatus,
            isOrganizer,
            entity.Attendance.Limit is not null ? entity.Attendance.Limit - attendeesCount : null,
            new GetEventDetailsCommunityDto(entity.Community.Id, entity.Community.Name),
            entity.Sessions.ToScheduleDtos().ToList(),
            entity.Speakers.Select(s => s.ToDto()).ToList(),
            imagesUrls);
    }

    public static IEnumerable<ScheduleDto> ToScheduleDtos(this IEnumerable<Session> entities)
    {
        return entities.GroupBy(e => e.StartTime.Date)
             .Select(g => new ScheduleDto(
                 g.Key,
                 g.OrderBy(e => e.StartTime).Select(e => e.ToDto()).ToList()))
             .OrderBy(e => e.Date);
    }

    public static SessionDto ToDto(this Session entity)
    {
        return new SessionDto(
            entity.Id,
            entity.Title,
            entity.StartTime,
            entity.EndTime,
            entity.Description,
            entity.Speakers.Select(s => s.ToDto()).ToList());
    }

    public static SpeakerDto ToDto(this Speaker entity)
    {
        return new SpeakerDto(
            entity.Id, 
            entity.Name,
            entity.Title,
            entity.Company,
            entity.Bio);
    }
}
