using EventManagement.Application.Events.Commands.AttendEvent;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace EventManagement.WebApi.Controllers;

[Authorize]
public class AttendanceController : ApiControllerBase
{
    [HttpPost]
    public async Task<ActionResult> AttendEvent(AttendEventCommand command)
    {
        await Mediator.Send(command);

        return NoContent();
    }
}
