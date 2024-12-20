﻿using EventManagement.Application.Common.Pagination;
using EventManagement.Application.Events.Commands.AttendEvent;
using EventManagement.Application.Events.Commands.CancelEventAttendance;
using EventManagement.Application.Events.Queries.GetCommunityEvents;
using EventManagement.Application.Events.Queries.GetEventDetails;
using EventManagement.Application.Events.Queries.GetMyEvents;
using Microsoft.AspNetCore.Mvc;

namespace EventManagement.WebApi.Controllers;

public class EventsController : ApiControllerBase
{
    [HttpGet]
    public async Task<ActionResult<PagedList<GetCommunityEventsEventDto>>> GetCommunityEvents(int communityId, bool isPast, int page, int pageSize)
    {
        return await Mediator.Send(new GetCommunityEventsQuery(communityId, isPast, page, pageSize));
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<GetEventDetailsDto>> GetDetails(int id)
    {
        return await Mediator.Send(new GetEventDetailsQuery(id));
    }

    [HttpPost("{id}/attend")]
    public async Task<ActionResult> Attend(int id)
    {
        await Mediator.Send(new AttendEventCommand(id));
        return NoContent();
    }

    [HttpPost("{id}/unattend")]
    public async Task<ActionResult> Unattend(int id)
    {
        await Mediator.Send(new CancelEventAttendanceCommand(id));
        return NoContent();
    }

    [HttpGet("my")]
    public async Task<ActionResult<NonPagedList<GetMyEventsDto>>> GetMyEvents(bool? isPast)
    {
        return await Mediator.Send(new GetMyEventsQuery(isPast ?? false));
    }
}
