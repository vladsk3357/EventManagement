using EventManagement.Domain.Entities;

namespace EventManagement.Application.Events.Queries.GetEventDetails;

internal static class GetEventDetailsMapper
{
    public static GetEventDetailsDto ToDto(this Event entity, int attendeesCount, bool isAttendable, bool isAttending, bool isOrganizer)
    {
        return new GetEventDetailsDto(
            entity.Id,
            entity.Name,
            entity.Description,
            entity.StartDate,
            entity.EndDate,
            entity.Location,
            attendeesCount,
            isAttendable,
            isAttending,
            isOrganizer,
            new GetEventDetailsCommunityDto(entity.Community.Id, entity.Community.Name));
    }
}
