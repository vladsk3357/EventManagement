using EventManagement.Application.Common.Pagination;
using EventManagement.Application.Communities.Commands.SubscribeCommunity;
using EventManagement.Application.Communities.Commands.UnsubscribeCommunity;
using EventManagement.Application.Communities.Queries.GetCommunityDetails;
using EventManagement.Application.Communities.Queries.GetMyCommunities;
using Microsoft.AspNetCore.Mvc;

namespace EventManagement.WebApi.Controllers;

public class CommunitiesController : ApiControllerBase
{
    [HttpPost("{id}/subscribe")]
    public async Task<ActionResult> Subscribe(int id, SubscribeCommunityCommand? command)
    {
        if (command is not null && id != command.CommunityId)
            return BadRequest();

        command ??= new SubscribeCommunityCommand(id);

        await Mediator.Send(command);
        return NoContent();
    }

    [HttpPost("{id}/unsubscribe")]
    public async Task<ActionResult> Unsubscribe(int id)
    {
        await Mediator.Send(new UnsubscribeCommunityCommand(id));
        return NoContent();
    }

    [HttpGet("{id}")]
    public async Task<CommunityDetailsDto> Get(int id)
    {
        return await Mediator.Send(new GetCommunityDetailsQuery(id));
    }

    [HttpGet("my")]
    public async Task<NonPagedList<GetMyCommunitiesDto>> GetMyCommunities()
    {
        return await Mediator.Send(new GetMyCommunitiesQuery());
    }
}
