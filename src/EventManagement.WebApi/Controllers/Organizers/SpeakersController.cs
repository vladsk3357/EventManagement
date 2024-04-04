using EventManagement.Application.Organizers.Speakers.Commands.CreateSpeaker;
using EventManagement.Application.Organizers.Speakers.Commands.DeleteSpeaker;
using EventManagement.Application.Organizers.Speakers.Commands.EditSpeaker;
using Microsoft.AspNetCore.Mvc;

namespace EventManagement.WebApi.Controllers.Organizers;

public sealed class SpeakersController : OrganizersApiControllerBase
{
    [HttpPost]
    public async Task<ActionResult> CreateSpeaker(CreateSpeakerCommand command)
    {
        await Mediator.Send(command);
        return Ok();
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult> DeleteSpeaker(int id)
    {
        await Mediator.Send(new DeleteSpeakerCommand(id));
        return NoContent();
    }

    [HttpPut("{id}")]
    public async Task<ActionResult> UpdateSpeaker(int id, EditSpeakerCommand command)
    {
        if (id != command.Id)
            return BadRequest();

        await Mediator.Send(command);
        return NoContent();
    }
}
