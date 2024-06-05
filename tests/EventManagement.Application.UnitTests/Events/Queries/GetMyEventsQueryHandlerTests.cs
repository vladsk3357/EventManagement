using EventManagement.Application.Common.Interfaces;
using EventManagement.Application.Events.Queries.GetMyEvents;
using EventManagement.Domain.Entities.Community;
using EventManagement.Domain.Entities.CommunityEvent;
using EventManagement.Domain.Entities;
using Moq;
using Moq.EntityFrameworkCore;

namespace EventManagement.Application.UnitTests.Events.Queries;

public class GetMyEventsQueryHandlerTests
{
    private readonly Mock<IApplicationDbContext> _contextMock;
    private readonly Mock<ICurrentUserAccessor> _currentUserAccessorMock;
    private readonly Mock<IDateTime> _dateTimeMock;
    private readonly GetMyEventsQueryHandler _handler;

    public GetMyEventsQueryHandlerTests()
    {
        _contextMock = new Mock<IApplicationDbContext>();
        _currentUserAccessorMock = new Mock<ICurrentUserAccessor>();
        _dateTimeMock = new Mock<IDateTime>();

        _handler = new GetMyEventsQueryHandler(
            _contextMock.Object,
            _currentUserAccessorMock.Object,
            _dateTimeMock.Object);
    }

    [Fact]
    public async Task Handle_ReturnsNonPagedListOfUpcomingEvents()
    {
        // Arrange
        var now = DateTime.UtcNow;
        var userId = "user-1";
        _currentUserAccessorMock.Setup(a => a.UserId).Returns(userId);
        _dateTimeMock.Setup(d => d.Now).Returns(now);

        var events = new List<Event>
        {
            new() {
                Id = 1,
                Name = "Event 1",
                StartDate = now.AddDays(1),
                Venue = new OnlineEventVenue { Url = "https://example.com" },
                Attendees = [new() { UserId = userId }],
                Community = new Community { Id = 1, Name = "Community 1" },
                IsCancelled = false
            },
            new() {
                Id = 2,
                Name = "Event 2",
                StartDate = now.AddDays(2),
                Venue = new OnlineEventVenue { Url = "https://example.com" },
                Attendees = [new() { UserId = userId }],
                Community = new Community { Id = 2, Name = "Community 2" },
                IsCancelled = false
            }
        };

        _contextMock.Setup(c => c.Attendees)
            .ReturnsDbSet([
                new() { UserId = userId, Event = events[0] },
                new() { UserId = userId, Event = events[1] }
            ]);

        var query = new GetMyEventsQuery(IsPast: false);

        // Act
        var result = await _handler.Handle(query, CancellationToken.None);

        // Assert
        Assert.NotNull(result);
        Assert.Equal(2, result.Items.Count);
        Assert.Contains(result.Items, e => e.Events.Any(ev => ev.Id == 1));
        Assert.Contains(result.Items, e => e.Events.Any(ev => ev.Id == 2));
    }

    [Fact]
    public async Task Handle_ReturnsNonPagedListOfPastEvents()
    {
        // Arrange
        var now = DateTime.UtcNow;
        var userId = "user-1";
        _currentUserAccessorMock.Setup(a => a.UserId).Returns(userId);
        _dateTimeMock.Setup(d => d.Now).Returns(now);

        var events = new List<Event>
        {
            new() {
                Id = 1,
                Name = "Event 1",
                StartDate = now.AddDays(-1),
                Venue = new OnlineEventVenue { Url = "https://example.com" },
                Attendees = [new() { UserId = userId }],
                Community = new Community { Id = 1, Name = "Community 1" },
                IsCancelled = false
            },
            new() {
                Id = 2,
                Name = "Event 2",
                StartDate = now.AddDays(-2),
                Venue = new OnlineEventVenue { Url = "https://example.com" },
                Attendees = [new() { UserId = userId }],
                Community = new Community { Id = 2, Name = "Community 2" },
                IsCancelled = false
            }
        };

        _contextMock.Setup(c => c.Attendees)
            .ReturnsDbSet(
            [
                new() { UserId = userId, Event = events[0] },
                new() { UserId = userId, Event = events[1] }
            ]);

        var query = new GetMyEventsQuery(IsPast: true);

        // Act
        var result = await _handler.Handle(query, CancellationToken.None);

        // Assert
        Assert.NotNull(result);
        Assert.Equal(2, result.Items.Count);
        Assert.Contains(result.Items, e => e.Events.Any(ev => ev.Id == 1));
        Assert.Contains(result.Items, e => e.Events.Any(ev => ev.Id == 2));
    }

    [Fact]
    public async Task Handle_UserHasNoEvents_ReturnsEmptyList()
    {
        // Arrange
        var userId = "user-1";
        _currentUserAccessorMock.Setup(a => a.UserId).Returns(userId);
        _dateTimeMock.Setup(d => d.Now).Returns(DateTime.UtcNow);

        _contextMock.Setup(c => c.Attendees)
            .ReturnsDbSet([]);

        var query = new GetMyEventsQuery(IsPast: false);

        // Act
        var result = await _handler.Handle(query, CancellationToken.None);

        // Assert
        Assert.NotNull(result);
        Assert.Empty(result.Items);
    }
}
