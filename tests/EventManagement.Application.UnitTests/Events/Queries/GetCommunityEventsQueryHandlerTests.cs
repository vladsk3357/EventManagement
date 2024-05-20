using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using EventManagement.Application.Common.Interfaces;
using EventManagement.Application.Events.Queries.GetCommunityEvents;
using EventManagement.Domain.Entities.CommunityEvent;
using Moq;
using Moq.EntityFrameworkCore;

namespace EventManagement.Application.UnitTests.Events.Queries;

public class GetCommunityEventsQueryHandlerTests
{
    [Fact]
    public async Task Handle_GivenPastEvents_ReturnsCorrectEvents()
    {
        // Arrange
        var communityId = 1;
        var isPast = true;
        var page = 1;
        var pageSize = 10;
        var now = DateTime.UtcNow;

        var events = new List<Event>
        {
            new()
            {
                Id = 1,
                CommunityId = communityId,
                Name = "Event 1",
                StartDate = now.AddHours(-2),
                Venue = new OnlineEventVenue { Url = "https://example.com" }
            },
            new()
            {
                Id = 2,
                CommunityId = communityId,
                Name = "Event 2",
                StartDate = now.AddHours(-1),
                Venue = new OnlineEventVenue { Url = "https://example.com" }
            }
        }.AsQueryable();

        var dbContextMock = new Mock<IApplicationDbContext>();
        dbContextMock.Setup(c => c.Events).ReturnsDbSet(events);

        var dateTimeMock = new Mock<IDateTime>();
        dateTimeMock.Setup(d => d.Now).Returns(now);

        var query = new GetCommunityEventsQuery(communityId, isPast, page, pageSize);
        var handler = new GetCommunityEventsQueryHandler(dbContextMock.Object, dateTimeMock.Object);

        // Act
        var result = await handler.Handle(query, CancellationToken.None);

        // Assert
        Assert.Equal(2, result.TotalCount);
        Assert.Equal(2, result.Items.Count);
        Assert.All(result.Items, e => Assert.True(e.StartDate < now));
    }

    [Fact]
    public async Task Handle_GivenUpcomingEvents_ReturnsCorrectEvents()
    {
        // Arrange
        var communityId = 1;
        var isPast = false;
        var page = 1;
        var pageSize = 10;
        var now = DateTime.UtcNow;

        var events = new List<Event>
            {
                new()
            {
                Id = 1,
                CommunityId = communityId,
                Name = "Event 1",
                StartDate = now.AddHours(1),
                Venue = new OnlineEventVenue { Url = "https://example.com" }
            },
            new()
            {
                Id = 2,
                CommunityId = communityId,
                Name = "Event 2",
                StartDate = now.AddHours(2),
                Venue = new OnlineEventVenue { Url = "https://example.com" }
            }
        }.AsQueryable();

        var dbContextMock = new Mock<IApplicationDbContext>();
        dbContextMock.Setup(c => c.Events).ReturnsDbSet(events);

        var dateTimeMock = new Mock<IDateTime>();
        dateTimeMock.Setup(d => d.Now).Returns(now);

        var query = new GetCommunityEventsQuery(communityId, isPast, page, pageSize);
        var handler = new GetCommunityEventsQueryHandler(dbContextMock.Object, dateTimeMock.Object);

        // Act
        var result = await handler.Handle(query, CancellationToken.None);

        // Assert
        Assert.Equal(2, result.TotalCount);
        Assert.Equal(2, result.Items.Count);
        Assert.All(result.Items, e => Assert.True(e.StartDate >= now));
    }
}
