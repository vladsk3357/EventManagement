using EventManagement.Application.Common.Models.Event;
using EventManagement.Domain.Entities;

namespace EventManagement.Application.Events.Queries.GetEventDetails;

public sealed record GetEventDetailsDto(
    int Id,
    string Name,
    string Description,
    DateTime StartDate,
    DateTime EndDate,
    EventVenueDto Venue,
    int AttendeesCount,
    bool IsAttendable,
    AttendeeStatus? AttendeeStatus,
    bool IsOrganizer,
    int? AttendanceCountLeft,
    GetEventDetailsCommunityDto Community,
    ICollection<ScheduleDto> Schedules,
    ICollection<SpeakerDto> Speakers);

public sealed record ScheduleDto(
    DateTime Date,
    ICollection<SessionDto> Sessions);

public sealed record SessionDto(
    int Id,
    string Title,
    DateTime StartTime,
    DateTime EndTime,
    string Description,
    ICollection<SpeakerDto> Speakers);

public sealed record SpeakerDto(
    int Id,
    string Name,
    string Title,
    string Company,
    string Bio);
