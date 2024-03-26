using EventManagement.Application.Organizers.Sessions.Commands.CreateSession;
using EventManagement.Application.Organizers.Sessions.Commands.DeleteSession;
using EventManagement.Application.Organizers.Sessions.Commands.EditSession;
using EventManagement.Application.Organizers.Sessions.Queries.GetSessions;
using Microsoft.AspNetCore.Mvc;

namespace EventManagement.WebApi.Controllers.Organizers;

public sealed class SessionsController : OrganizersApiControllerBase
{
    [HttpPost]
    public async Task<CreateSessionCommandResult> CreateSession(CreateSessionCommand command)
    {
        return await Mediator.Send(command);
    }

    [HttpGet]
    public async Task<GetSessionsResult> GetSessions([FromQuery] GetSessionsQuery query)
    {
        return await Mediator.Send(query);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteSession(int id)
    {
        await Mediator.Send(new DeleteSessionCommand(id));
        return NoContent();
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateSession(int id, EditSessionCommand command)
    {
        if (id != command.Id)
            return BadRequest();

        await Mediator.Send(command);
        return NoContent();
    }
}
