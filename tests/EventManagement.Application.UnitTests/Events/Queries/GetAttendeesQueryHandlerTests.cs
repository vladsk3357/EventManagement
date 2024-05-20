using EventManagement.Application.Admin.Users.Queries.GetUsers;
using EventManagement.Application.Common.Interfaces;
using EventManagement.Application.Events.Queries.GetAttendees;
using EventManagement.Domain.Entities;
using Moq;
using Moq.EntityFrameworkCore;

namespace EventManagement.Application.UnitTests.Events.Queries;

public class GetAttendeesQueryHandlerTests
{
    private readonly Mock<IApplicationDbContext> _dbContextMock;
    private readonly Mock<IUserService> _userServiceMock;

    public GetAttendeesQueryHandlerTests()
    {
        _dbContextMock = new Mock<IApplicationDbContext>();
        _userServiceMock = new Mock<IUserService>();
    }

    [Fact]
    public async Task Handle_EventHasAttendees_ReturnsAttendees()
    {
        // Arrange
        var eventId = 1;
        var page = 1;
        var pageSize = 10;
        var attendees = new List<Attendee>
        {
            new() { UserId = "user1", EventId = eventId },
            new() { UserId = "user2", EventId = eventId },
            new() { UserId = "user3", EventId = eventId }
        };
        var expectedAttendeeDtos = attendees.Select(a => new AttendeeDto(a.UserId, "User " + a.UserId)).ToList();
        var users = attendees.Select(a => new User { Id = a.UserId, Name = "User " + a.UserId }).ToList();
        
        _dbContextMock.Setup(c => c.Attendees).ReturnsDbSet(attendees.AsQueryable());
        _userServiceMock.Setup(u => u.GetUsersByIdListAsync(It.IsAny<IEnumerable<string>>(), It.IsAny<CancellationToken>()))
            .ReturnsAsync(users);

        var query = new GetAttendeesQuery(eventId, page, pageSize);
        var handler = new GetAttendeesQueryHandler(_dbContextMock.Object, _userServiceMock.Object);

        // Act
        var result = await handler.Handle(query, CancellationToken.None);

        // Assert
        Assert.Equal(expectedAttendeeDtos, result.Items);
        Assert.Equal(attendees.Count, result.TotalCount);
        Assert.Equal(page, result.Page);
        Assert.Equal(pageSize, result.PageSize);
    }

    [Fact]
    public async Task Handle_EventHasNoAttendees_ReturnsEmptyList()
    {
        // Arrange
        var eventId = 1;
        var page = 1;
        var pageSize = 10;

        _dbContextMock.Setup(c => c.Attendees).ReturnsDbSet([]);
        _userServiceMock.Setup(u => u.GetUsersByIdListAsync(It.IsAny<IEnumerable<string>>(), It.IsAny<CancellationToken>()))
            .ReturnsAsync([]);

        var query = new GetAttendeesQuery(eventId, page, pageSize);
        var handler = new GetAttendeesQueryHandler(_dbContextMock.Object, _userServiceMock.Object);

        // Act
        var result = await handler.Handle(query, CancellationToken.None);

        // Assert
        Assert.Empty(result.Items);
        Assert.Equal(0, result.TotalCount);
        Assert.Equal(page, result.Page);
        Assert.Equal(pageSize, result.PageSize);
    }
}
