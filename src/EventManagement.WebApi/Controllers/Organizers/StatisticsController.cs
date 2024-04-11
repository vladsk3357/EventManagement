using EventManagement.Application.Organizers.Dashboard.Queries.GetEventAttendeesStatistics;
using Microsoft.AspNetCore.Mvc;

namespace EventManagement.WebApi.Controllers.Organizers;

public sealed class StatisticsController : OrganizersApiControllerBase
{
    [HttpGet("events-attendees/{communityId}")]
    public async Task<EventsAttendeesStatisticsDto> GetEventAttendeesStatistics(int communityId)
    {
        return await Mediator.Send(new GetEventsAttendeesStatisticsQuery(communityId));
    }
}
