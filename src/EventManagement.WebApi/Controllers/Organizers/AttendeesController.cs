using EventManagement.Application.Organizers.Events.Commands.ConfirmAttendee;
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
    public async Task<IActionResult> ConfirmAttendee(int id)
    {
        await Mediator.Send(new ConfirmAttendeeCommand(id));
        return NoContent();
    }
}
