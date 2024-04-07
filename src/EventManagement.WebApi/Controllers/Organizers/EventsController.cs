using EventManagement.Application.Common.Pagination;
using EventManagement.Application.Organizers.Events.Commands.DeleteEvent;
using EventManagement.Application.Organizers.Events.Commands.EditEvent;
using EventManagement.Application.Organizers.Events.Queries.GetAttendees;
using EventManagement.Application.Organizers.Events.Queries.GetEvent;
using EventManagement.Application.Organizers.Sessions.Queries.GetSessions;
using EventManagement.Application.Organizers.Speakers.Queries.GetSpeakers;
using EventManagement.Domain.Entities;
using Microsoft.AspNetCore.Mvc;

namespace EventManagement.WebApi.Controllers.Organizers;

public sealed class EventsController : OrganizersApiControllerBase
{
    [HttpGet("{id}")]
    public async Task<EventDto> GetEventAsync(int id)
    {
        return await Mediator.Send(new GetEventQuery(id));
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteEventAsync(int id)
    {
        await Mediator.Send(new DeleteEventCommand(id));
        return NoContent();
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateEventAsync(int id, EditEventCommand command)
    {
        if (id != command.Id)
            return BadRequest();

        await Mediator.Send(command);
        return NoContent();
    }

    [HttpGet("{eventId}/speakers")]
    public async Task<GetSpeakersResult> GetSpeakers(int eventId)
    {
        return await Mediator.Send(new GetSpeakersQuery(eventId));
    }

    [HttpGet("{eventId}/attendees")]
    public async Task<PagedList<AttendeeDto>> GetAttendees(int eventId, AttendeeStatus? status, int page, int pageSize)
    {
        return await Mediator.Send(new GetAttendeesQuery(eventId, status, page, pageSize));
    }

    [HttpGet("{eventId}/sessions")]
    public async Task<GetSessionsResult> GetSessions(int eventId)
    {
        return await Mediator.Send(new GetSessionsQuery(eventId, null));
    }
}
