using EventManagement.Application.Organizers.Events.Commands.ChangeAttendeeStatus;
using EventManagement.Application.Organizers.Events.Commands.DeleteAttendee;
using Microsoft.AspNetCore.Mvc;

namespace EventManagement.WebApi.Controllers.Organizers;

public class AttendeesController : OrganizersApiControllerBase
{
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteAttendeeAsync(int id)
    {
        await Mediator.Send(new DeleteAttendeeCommand(id));
        return NoContent();
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> ChangeAttendeeStatus(int id, ChangeAttendeeStatusCommand command)
    {
        if (id != command?.Id)
            return BadRequest();

        await Mediator.Send(command);
        return NoContent();
    }
}
