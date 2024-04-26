using EventManagement.Application.Common.Pagination;
using EventManagement.Application.Organizers.Communication.Commands.SendCommunityEmail;
using EventManagement.Application.Organizers.Communication.Commands.SendEventEmail;
using EventManagement.Application.Organizers.Communities.Commands.CreateCommunity;
using EventManagement.Application.Organizers.Communities.Commands.DeleteCommunity;
using EventManagement.Application.Organizers.Communities.Commands.EditCommunity;
using EventManagement.Application.Organizers.Communities.Queries.GetCommunities;
using EventManagement.Application.Organizers.Communities.Queries.GetCommunity;
using EventManagement.Application.Organizers.CommunitySubscriptionForms.Commands.EditCommunitySubscriptionForm;
using EventManagement.Application.Organizers.CommunitySubscriptionForms.Queries.GetCommunitySubscriptionForm;
using EventManagement.Application.Organizers.CommunitySubscriptionForms.Queries.GetCommunitySubscriptionFormAnswerDetails;
using EventManagement.Application.Organizers.CommunitySubscriptionForms.Queries.GetCommunitySubscriptionFormAnswers;
using EventManagement.Application.Organizers.Events.Commands.CreateEvent;
using EventManagement.Application.Organizers.Events.Queries.GetEvents;
using EventManagement.Application.Organizers.Forms.Queries.GetAllForms;
using EventManagement.Application.Organizers.Invitations.Commands;
using EventManagement.Application.Organizers.Subscribers.Queries.GetSubscribers;
using EventManagement.WebApi.Models;
using EventManagement.WebApi.Models.Organizers.Communities;
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
    public async Task<IActionResult> UpdateCommunityAsync(int id, [FromForm] EditCommunityModel model)
    {
        if (id != model?.Id)
            return BadRequest();

        await Mediator.Send(new EditCommunityCommand(
            model.Id,
            model.Name,
            model.Location,
            model.Domain,
            model.ShortDescription,
            model.Description,
            model.CommunityImage is null ? null : new FormFileProxy(model.CommunityImage)));

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
    public async Task<PagedList<EventDto>> GetEventsAsync(int communityId, string? q, bool isPast, int page, int pageSize)
    {
        return await Mediator.Send(new GetEventsQuery(communityId, q, isPast, page, pageSize));
    }

    [HttpGet("{communityId}/subscribers")]
    public async Task<PagedList<SubscriberDto>> GetSubscribersAsync(int communityId, int page, int pageSize)
    {
        return await Mediator.Send(new GetSubscribersQuery(communityId, page, pageSize));
    }

    [HttpGet("{communityId}/subscription-form")]
    public async Task<GetCommunitySubscriptionFormDto> GetSubscriptionFormAsync(int communityId)
    {
        return await Mediator.Send(new GetCommunitySubscriptionFormQuery(communityId));
    }

    [HttpPut("{communityId}/subscription-form")]
    public async Task<IActionResult> UpdateSubscriptionFormAsync(int communityId, EditCommunitySubscriptionFormCommand command)
    {
        if (communityId != command?.CommunityId)
            return BadRequest();

        await Mediator.Send(command);
        return NoContent();
    }

    [HttpGet("{communityId}/subscription-form/answers")]
    public async Task<PagedList<FormAnswerDto>> GetSubscriptionFormAnswersAsync(int communityId, int page, int pageSize)
    {
        return await Mediator.Send(new GetCommunitySubscriptionFormAnswersQuery(communityId, page, pageSize));
    }

    [HttpGet("{communityId}/subscription-form/answers/{answerId}")]
    public async Task<GetCommunitySubscriptionFormAnswerDetailsDto> GetSubscriptionFormAnswerDetailsAsync(int communityId, int answerId)
    {
        return await Mediator.Send(new GetCommunitySubscriptionFormAnswerDetailsQuery(communityId, answerId));
    }

    [HttpGet("{communityId}/all-forms")]
    public async Task<NonPagedList<FormDto>> GetAllFormsAsync(int communityId)
    {
        return await Mediator.Send(new GetAllFormsQuery(communityId));
    }

    [HttpPost("{communityId}/send-email")]
    public async Task<IActionResult> SendCommunityEmailAsync(int communityId, SendCommunityEmailCommand command)
    {
        if (communityId != command?.CommunityId)
            return BadRequest();

        await Mediator.Send(command);
        return NoContent();
    }

    [HttpPost("{eventId}/send-event-email")]
    public async Task<IActionResult> SendEventEmailAsync(int eventId, SendEventEmailCommand command)
    {
        if (eventId != command?.EventId)
            return BadRequest();

        await Mediator.Send(command);
        return NoContent();
    }

    [HttpPost("{communityId}/invite")]
    public async Task<IActionResult> InviteToCommunity(int communityId, InviteToCommunityCommand command)
    {
        if (communityId != command?.CommunityId)
            return BadRequest();

        await Mediator.Send(command);
        return NoContent();
    }
}
