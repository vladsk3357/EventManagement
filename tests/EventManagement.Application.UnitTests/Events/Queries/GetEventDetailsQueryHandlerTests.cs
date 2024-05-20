using EventManagement.Application.Common.Exceptions;
using EventManagement.Application.Common.Interfaces;
using EventManagement.Application.Events.Queries.GetEventDetails;
using EventManagement.Domain.Entities.CommunityEvent;
using EventManagement.Domain.Entities;
using Moq;
using Moq.EntityFrameworkCore;
using EventManagement.Domain.Entities.Community;

namespace EventManagement.Application.UnitTests.Events.Queries;

public class GetEventDetailsQueryHandlerTests
{
    private readonly Mock<IApplicationDbContext> _contextMock;
    private readonly Mock<IDateTime> _dateTimeMock;
    private readonly Mock<ICurrentUserAccessor> _currentUserAccessorMock;
    private readonly Mock<IFileStorageService> _fileStorageServiceMock;
    private readonly GetEventDetailsQueryHandler _handler;

    public GetEventDetailsQueryHandlerTests()
    {
        _contextMock = new Mock<IApplicationDbContext>();
        _dateTimeMock = new Mock<IDateTime>();
        _currentUserAccessorMock = new Mock<ICurrentUserAccessor>();
        _fileStorageServiceMock = new Mock<IFileStorageService>();

        _handler = new GetEventDetailsQueryHandler(
            _contextMock.Object,
            _dateTimeMock.Object,
            _currentUserAccessorMock.Object,
            _fileStorageServiceMock.Object);
    }

    [Fact]
    public async Task Handle_EventNotFound_ThrowsNotFoundException()
    {
        // Arrange
        var query = new GetEventDetailsQuery(1);

        _contextMock.Setup(c => c.Events)
            .ReturnsDbSet(new List<Event>());

        // Act & Assert
        await Assert.ThrowsAsync<NotFoundException>(() => _handler.Handle(query, CancellationToken.None));
    }

    [Fact]
    public async Task Handle_ReturnsEventDetails()
    {
        // Arrange
        var eventId = 1;
        var userId = "user123";
        var now = DateTime.UtcNow;

        var community = new Community { Id = 1, Name = "Community1" };
        var @event = new Event
        {
            Id = eventId,
            Name = "Event1",
            Description = "Description1",
            StartDate = now.AddHours(2),
            EndDate = now.AddHours(4),
            Community = community,
            Attendees =
            [
                new() { UserId = userId, Status = AttendeeStatus.Confirmed }
            ],
            Speakers =
            [
                new() { Id = 1, Name = "Speaker1", Title = "Title1", Company = "Company1", Bio = "Bio1" }
            ],
            Sessions =
            [
                new() {
                    Id = 1,
                    Title = "Session1",
                    StartTime = now.AddHours(2),
                    Duration = TimeSpan.FromHours(1),
                    Description = "Session Description",
                    Speakers =
                    [
                        new() { Id = 1, Name = "Speaker1", Title = "Title1", Company = "Company1", Bio = "Bio1" }
                    ],
                    Level = "Beginner"
                }
            ],
            Images =
            [
                new() { FileName = "image1.jpg" },
                new() { FileName = "image2.jpg" }
            ],
            Attendance = new EventAttendance(),
            Venue = new OnlineEventVenue { Url = "http://example.com" }
        };

        _contextMock.Setup(c => c.Events)
            .ReturnsDbSet(new List<Event> { @event }.AsQueryable());

        _dateTimeMock.Setup(d => d.Now).Returns(now);
        _currentUserAccessorMock.Setup(c => c.UserId).Returns(userId);
        _fileStorageServiceMock.Setup(f => f.GetFileUrlAsync(It.IsAny<string>(), It.IsAny<CancellationToken>()))
            .ReturnsAsync((string fileName, CancellationToken cancellationToken) => new Uri($"http://example.com/{fileName}"));

        var query = new GetEventDetailsQuery(eventId);

        // Act
        var result = await _handler.Handle(query, CancellationToken.None);

        // Assert
        Assert.Equal(eventId, result.Id);
        Assert.Equal("Event1", result.Name);
        Assert.Equal("Description1", result.Description);
        Assert.Equal(now.AddHours(2), result.StartDate);
        Assert.Equal(now.AddHours(4), result.EndDate);
        Assert.Equal("Community1", result.Community.Name);
        Assert.Equal(1, result.AttendeesCount);
        Assert.Equal(2, result.ImagesUrls.Count);
        Assert.Contains(result.ImagesUrls, url => url == "http://example.com/image1.jpg");
        Assert.Contains(result.ImagesUrls, url => url == "http://example.com/image2.jpg");
        Assert.Single(result.Speakers);
        Assert.Equal("Speaker1", result.Speakers.First().Name);
        Assert.Single(result.Schedules);
        Assert.Equal("Session1", result.Schedules.First().Sessions.First().Title);
    }

    [Fact]
    public async Task Handle_UserIsOrganizer_ReturnsIsOrganizerTrue()
    {
        // Arrange
        var eventId = 1;
        var userId = "user123";

        var @event = new Event
        {
            Id = eventId,
            OrganizerId = userId,
            Attendees = [],
            Venue = new OnlineEventVenue(),
            Attendance = new EventAttendance(),
            Sessions = [],
            Speakers = [],
            Community = new Community()
        };

        _contextMock.Setup(c => c.Events)
            .ReturnsDbSet(new List<Event> { @event }.AsQueryable());

        _currentUserAccessorMock.Setup(c => c.UserId).Returns(userId);

        var query = new GetEventDetailsQuery(eventId);

        // Act
        var result = await _handler.Handle(query, CancellationToken.None);

        // Assert
        Assert.True(result.IsOrganizer);
    }

    [Fact]
    public async Task Handle_EventIsAttendable_ReturnsIsAttendableTrue()
    {
        // Arrange
        var eventId = 1;
        var userId = "user123";
        var now = DateTime.UtcNow;

        var @event = new Event
        {
            Id = eventId,
            OrganizerId = "organizer123",
            StartDate = now.AddHours(2),
            Attendance = new EventAttendance(),
            Attendees = [],
            Venue = new OnlineEventVenue(),
            Sessions = [],
            Speakers = [],
            Community = new Community()
        };

        _contextMock.Setup(c => c.Events)
            .ReturnsDbSet(new List<Event> { @event }.AsQueryable());

        _dateTimeMock.Setup(d => d.Now).Returns(now);
        _currentUserAccessorMock.Setup(c => c.UserId).Returns(userId);

        var query = new GetEventDetailsQuery(eventId);

        // Act
        var result = await _handler.Handle(query, CancellationToken.None);

        // Assert
        Assert.True(result.IsAttendable);
    }

    [Fact]
    public async Task Handle_AttendeesCount_ReturnsCorrectCount()
    {
        // Arrange
        var eventId = 1;
        var now = DateTime.UtcNow;

        var @event = new Event
        {
            Id = eventId,
            StartDate = now.AddHours(2),
            Attendees =
            [
                new() { Status = AttendeeStatus.Confirmed },
                new() { Status = AttendeeStatus.Confirmed },
                new() { Status = AttendeeStatus.Pending }
            ],
            Venue = new OnlineEventVenue(),
            Attendance = new EventAttendance(),
            Sessions = [],
            Speakers = [],
            Community = new Community()
        };

        _contextMock.Setup(c => c.Events)
            .ReturnsDbSet(new List<Event> { @event }.AsQueryable());

        _dateTimeMock.Setup(d => d.Now).Returns(now);

        var query = new GetEventDetailsQuery(eventId);

        // Act
        var result = await _handler.Handle(query, CancellationToken.None);

        // Assert
        Assert.Equal(2, result.AttendeesCount);
    }
}
