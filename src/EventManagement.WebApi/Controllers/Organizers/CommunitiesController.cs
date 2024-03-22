using EventManagement.Application.Common.Pagination;
using EventManagement.Application.Organizers.Communities.Commands.CreateCommunity;
using EventManagement.Application.Organizers.Communities.Commands.DeleteCommunity;
using EventManagement.Application.Organizers.Communities.Commands.EditCommunity;
using EventManagement.Application.Organizers.Communities.Queries.GetCommunities;
using EventManagement.Application.Organizers.Communities.Queries.GetCommunity;
using EventManagement.Application.Organizers.Events.Commands.CreateEvent;
using EventManagement.Application.Organizers.Events.Queries.GetEvents;
using EventManagement.Application.Organizers.Subscribers.Queries.GetSubscribers;
using Microsoft.AspNetCore.Mvc;

namespace EventManagement.WebApi.Controllers.Organizers;

public sealed class CommunitiesController : OrganizersApiControllerBase
{
    [HttpPost]
    public async Task<CreateCommunityResultDto> CreateCommunityAsync(CreateCommunityCommand command)
    {
        return await Mediator.Send(command);
    }

    [HttpGet("{id}")]
    public async Task<GetCommunityDto> GetCommunityAsync(int id)
    {
        return await Mediator.Send(new GetCommunityQuery(id));
    }

    [HttpGet]
    public async Task<NonPagedList<CommunityDto>> GetCommunitiesAsync()
    {
        return await Mediator.Send(new GetCommunitiesQuery());
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteCommunityAsync(int id)
    {
        await Mediator.Send(new DeleteCommunityCommand(id));
        return NoContent();
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateCommunityAsync(int id, EditCommunityCommand command)
    {
        if (id != command?.Id)
            return BadRequest();

        await Mediator.Send(command);
        return NoContent();
    }

    [HttpPost("{communityId}/events")]
    public async Task<ActionResult<CreateCommunityResultDto>> CreateEventAsync(int communityId, [FromBody] CreateEventCommand command)
    {
        if (communityId != command?.CommunityId)
            return BadRequest();

        var result = await Mediator.Send(command);

        return Ok(result);
    }

    [HttpGet("{communityId}/events")]
    public async Task<PagedList<GetEventsEventDto>> GetEventsAsync(int communityId, string? q, string? sortBy, string? sortOrder, int page, int pageSize)
    {
        return await Mediator.Send(new GetEventsQuery(communityId, q, sortBy, sortOrder, page, pageSize));
    }

    [HttpGet("{communityId}/subscribers")]
    public async Task<PagedList<SubscriberDto>> GetSubscribersAsync(int communityId, int page, int pageSize)
    {
        return await Mediator.Send(new GetSubscribersQuery(communityId, page, pageSize));
    }
}
