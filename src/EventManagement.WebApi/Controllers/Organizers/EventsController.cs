using EventManagement.Application.Organizers.Events.Commands.DeleteEvent;
using EventManagement.Application.Organizers.Events.Commands.EditEvent;
using EventManagement.Application.Organizers.Speakers.Queries.GetSpeakers;
using Microsoft.AspNetCore.Mvc;

namespace EventManagement.WebApi.Controllers.Organizers;

public sealed class EventsController : OrganizersApiControllerBase
{
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
}
