using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using EventManagement.Application.Common.Interfaces;
using EventManagement.Application.Common.Services.Documents;
using EventManagement.Application.Common.Services.Search;
using EventManagement.Application.Services.Search;
using EventManagement.Domain.Entities.Community;
using EventManagement.Domain.Entities.CommunityEvent;
using EventManagement.Domain.Entities;
using Moq;
using EventManagement.Application.Events.Queries.GetEvents;
using Moq.EntityFrameworkCore;

namespace EventManagement.Application.UnitTests.Events.Queries;

public class GetEventsQueryHandlerTests
{
    private readonly Mock<IApplicationDbContext> _contextMock;
    private readonly Mock<IEventsSearchService> _eventsSearchServiceMock;
    private readonly Mock<IDateTime> _dateTimeMock;
    private readonly GetEventsQueryHandler _handler;

    public GetEventsQueryHandlerTests()
    {
        _contextMock = new Mock<IApplicationDbContext>();
        _eventsSearchServiceMock = new Mock<IEventsSearchService>();
        _dateTimeMock = new Mock<IDateTime>();

        _handler = new GetEventsQueryHandler(
            _contextMock.Object,
            _eventsSearchServiceMock.Object,
            _dateTimeMock.Object);
    }

    [Fact]
    public async Task Handle_ReturnsPagedListOfEventDtos()
    {
        // Arrange
        var now = DateTime.UtcNow;
        var eventId1 = 1;
        var eventId2 = 2;

        var events = new List<Event>
        {
            new Event
            {
                Id = eventId1,
                Name = "Event 1",
                Community = new Community { Id = 1, Name = "Community 1" },
                StartDate = now.AddDays(1),
                Attendees = new List<Attendee>(),
                Venue = new OnlineEventVenue { Url = "https://example.com" },
                IsCancelled = false
            },
            new Event
            {
                Id = eventId2,
                Name = "Event 2",
                Community = new Community { Id = 2, Name = "Community 2" },
                StartDate = now.AddDays(2),
                Attendees = new List<Attendee>(),
                Venue = new OnlineEventVenue { Url = "https://example.com" },
                IsCancelled = true
            }
        };

        _contextMock.Setup(c => c.Events)
            .ReturnsDbSet(events);

        var searchResult = new SearchResult<EventIndexDocument>(
            events.Select(e => new EventIndexDocument(
                e.Id,
                e.Name,
                e.Description,
                e.CommunityId,
                e.StartDate,
                e.EndDate,
                e.Attendees.Count,
                "online")),
            1,
            10,
            2);

        _eventsSearchServiceMock.Setup(s => s.SearchAsync(It.IsAny<SearchRequest<EventIndexDocument>>(), It.IsAny<CancellationToken>()))
            .ReturnsAsync(searchResult);

        var query = new GetEventsQuery(null, "asc", 1, 10, null, null, null);

        // Act
        var result = await _handler.Handle(query, CancellationToken.None);

        // Assert
        Assert.Equal(2, result.TotalCount);
        Assert.Equal(2, result.Items.Count);
        Assert.Contains(result.Items, e => e.Id == eventId1 && e.Name == "Event 1" && e.Community.Name == "Community 1");
        Assert.Contains(result.Items, e => e.Id == eventId2 && e.Name == "Event 2" && e.Community.Name == "Community 2");
    }

    [Fact]
    public async Task Handle_WithFilters_ReturnsFilteredEvents()
    {
        // Arrange
        var now = DateTime.UtcNow;
        var eventId1 = 1;

        var events = new List<Event>
        {
            new() {
                Id = eventId1,
                Name = "Event 1",
                Community = new Community { Id = 1, Name = "Community 1" },
                StartDate = now.AddDays(1),
                Attendees = [],
                Venue = new OnlineEventVenue { Url = "https://example.com" },
                IsCancelled = false
            }
        };

        _contextMock.Setup(c => c.Events)
            .ReturnsDbSet(events);

        var searchResult = new SearchResult<EventIndexDocument>
        (
            events.Select(e => new EventIndexDocument(
                e.Id,
                e.Name,
                e.Description,
                e.CommunityId,
                e.StartDate,
                e.EndDate,
                e.Attendees.Count,
                "online")),
            1,
            10,
            1
        );

        _eventsSearchServiceMock.Setup(s => s.SearchAsync(It.IsAny<SearchRequest<EventIndexDocument>>(), It.IsAny<CancellationToken>()))
            .ReturnsAsync(searchResult);

        var query = new GetEventsQuery(null, "asc", 1, 10, now, now.AddDays(2), new[] { "Venue 1" });

        // Act
        var result = await _handler.Handle(query, CancellationToken.None);

        // Assert
        Assert.Equal(1, result.TotalCount);
        Assert.Single(result.Items);
        Assert.Contains(result.Items, e => e.Id == eventId1 && e.Name == "Event 1" && e.Community.Name == "Community 1");
    }

    [Fact]
    public async Task Handle_EmptySearchResult_ReturnsEmptyPagedList()
    {
        // Arrange
        var now = DateTime.UtcNow;
        var eventId1 = 1;

        var events = new List<Event>
        {
            new() {
                Id = eventId1,
                Name = "Event 1",
                Community = new Community { Id = 1, Name = "Community 1" },
                StartDate = now.AddDays(1),
                Attendees = [],
                Venue = new OnlineEventVenue { Url = "https://example.com" },
                IsCancelled = false
            }
        };

        _contextMock.Setup(c => c.Events)
            .ReturnsDbSet(events);

        var searchResult = new SearchResult<EventIndexDocument>(
            [],
            1,
            10,
            0);

        _eventsSearchServiceMock.Setup(s => s.SearchAsync(It.IsAny<SearchRequest<EventIndexDocument>>(), It.IsAny<CancellationToken>()))
            .ReturnsAsync(searchResult);

        var query = new GetEventsQuery(null, "asc", 1, 10, null, null, null);

        // Act
        var result = await _handler.Handle(query, CancellationToken.None);

        // Assert
        Assert.Empty(result.Items);
        Assert.Equal(0, result.TotalCount);
    }
}
