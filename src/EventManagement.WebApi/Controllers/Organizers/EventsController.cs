using EventManagement.Application.Common.Pagination;
using EventManagement.Application.Organizers.Events.Commands.AddImages;
using EventManagement.Application.Organizers.Events.Commands.CancelEvent;
using EventManagement.Application.Organizers.Events.Commands.DeleteEvent;
using EventManagement.Application.Organizers.Events.Commands.DeleteImage;
using EventManagement.Application.Organizers.Events.Commands.EditEvent;
using EventManagement.Application.Organizers.Events.Queries.GetAttendees;
using EventManagement.Application.Organizers.Events.Queries.GetEvent;
using EventManagement.Application.Organizers.Events.Queries.GetImages;
using EventManagement.Application.Organizers.Sessions.Queries.GetSessions;
using EventManagement.Application.Organizers.Speakers.Queries.GetSpeakers;
using EventManagement.Domain.Entities;
using EventManagement.WebApi.Models;
using EventManagement.WebApi.Models.Organizers.Events;
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
        return await Mediator.Send(new GetSessionsQuery(eventId));
    }

    [HttpGet("{eventId}/images")]
    public async Task<NonPagedList<ImageDto>> GetImages(int eventId)
    {
        return await Mediator.Send(new GetImagesQuery(eventId));
    }

    [HttpPost("{eventId}/images")]
    public async Task<IActionResult> AddImages(int eventId, [FromForm] AddImagesModel model)
    {
        if (eventId != model.EventId)
            return BadRequest();

        var command = new AddImagesCommand(
            eventId, 
            model.Images.Select(i => new FormFileProxy(i)).ToArray());

        await Mediator.Send(command);
        return NoContent();
    }

    [HttpDelete("{eventId}/images/{imageId}")]
    public async Task<IActionResult> DeleteImage(int eventId, int imageId)
    {
        await Mediator.Send(new DeleteImageCommand(eventId, imageId));
        return NoContent();
    }

    [HttpPut("{eventId}/cancel")]
    public async Task<IActionResult> CancelEvent(int eventId)
    {
        await Mediator.Send(new CancelEventCommand(eventId));
        return NoContent();
    }
}
