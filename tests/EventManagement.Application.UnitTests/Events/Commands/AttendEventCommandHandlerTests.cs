using EventManagement.Application.Common.Exceptions;
using EventManagement.Application.Common.Interfaces;
using EventManagement.Application.Events.Commands.AttendEvent;
using EventManagement.Domain.Entities.CommunityEvent;
using EventManagement.Domain.Entities;
using Moq;
using Moq.EntityFrameworkCore;

namespace EventManagement.Application.UnitTests.Events.Commands;

public class AttendEventCommandHandlerTests
{
    private readonly Mock<IApplicationDbContext> _contextMock;
    private readonly Mock<ICurrentUserAccessor> _currentUserAccessorMock;
    private readonly AttendEventCommandHandler _handler;

    public AttendEventCommandHandlerTests()
    {
        _contextMock = new Mock<IApplicationDbContext>();
        _currentUserAccessorMock = new Mock<ICurrentUserAccessor>();

        _handler = new AttendEventCommandHandler(_contextMock.Object, _currentUserAccessorMock.Object);
    }

    [Fact]
    public async Task Handle_EventDoesNotExist_ThrowsInvalidRequestException()
    {
        // Arrange
        var userId = "user-1";
        var command = new AttendEventCommand(1);

        _currentUserAccessorMock.Setup(a => a.UserId).Returns(userId);

        _contextMock.Setup(c => c.Events).ReturnsDbSet([]);

        // Act & Assert
        await Assert.ThrowsAsync<InvalidRequestException>(() => _handler.Handle(command, CancellationToken.None));
    }

    [Fact]
    public async Task Handle_UserAlreadyAttendingEvent_ThrowsInvalidRequestException()
    {
        // Arrange
        var userId = "user-1";
        var eventId = 1;
        var command = new AttendEventCommand(eventId);
        var existingAttendee = new Attendee { UserId = userId, EventId = eventId, Status = AttendeeStatus.Confirmed };
        var events = new List<Event> { new() { Id = eventId } };

        _currentUserAccessorMock.Setup(a => a.UserId).Returns(userId);

        _contextMock.Setup(c => c.Events).ReturnsDbSet(events);
        _contextMock.Setup(c => c.Attendees).ReturnsDbSet([existingAttendee]);

        // Act & Assert
        await Assert.ThrowsAsync<InvalidRequestException>(() => _handler.Handle(command, CancellationToken.None));
    }

    [Fact]
    public async Task Handle_AttendanceLimitReached_ThrowsInvalidRequestException()
    {
        // Arrange
        var userId = "user-1";
        var eventId = 1;
        var command = new AttendEventCommand(eventId);
        var communityEvent = new Event
        {
            Id = eventId,
            Attendance = new EventAttendance { Limit = 1 }
        };

        _currentUserAccessorMock.Setup(a => a.UserId).Returns(userId);

        _contextMock.Setup(c => c.Events).ReturnsDbSet([communityEvent]);
        _contextMock.Setup(c => c.Attendees).ReturnsDbSet([new Attendee { EventId = eventId, Status = AttendeeStatus.Confirmed }]);

        // Act & Assert
        await Assert.ThrowsAsync<InvalidRequestException>(() => _handler.Handle(command, CancellationToken.None));
    }

    [Fact]
    public async Task Handle_SuccessfullyAttendEvent()
    {
        // Arrange
        var userId = "user-1";
        var eventId = 1;
        var command = new AttendEventCommand(eventId);
        var communityEvent = new Event
        {
            Id = eventId,
            Attendance = new EventAttendance { Limit = null, ShouldBeApproved = false }
        };

        _currentUserAccessorMock.Setup(a => a.UserId).Returns(userId);

        _contextMock.Setup(c => c.Events).ReturnsDbSet([communityEvent]);
        _contextMock.Setup(c => c.Attendees).ReturnsDbSet([]);

        // Act
        await _handler.Handle(command, CancellationToken.None);

        // Assert
        _contextMock.Verify(c => c.Attendees.AddAsync(It.Is<Attendee>(a => a.UserId == userId && a.EventId == eventId && a.Status == AttendeeStatus.Confirmed), It.IsAny<CancellationToken>()), Times.Once);
        _contextMock.Verify(c => c.SaveChangesAsync(It.IsAny<CancellationToken>()), Times.Once);
    }

    [Fact]
    public async Task Handle_SuccessfullyAttendEventWithApproval()
    {
        // Arrange
        var userId = "user-1";
        var eventId = 1;
        var command = new AttendEventCommand(eventId);
        var communityEvent = new Event
        {
            Id = eventId,
            Attendance = new EventAttendance { Limit = null, ShouldBeApproved = true }
        };

        _currentUserAccessorMock.Setup(a => a.UserId).Returns(userId);

        _contextMock.Setup(c => c.Events).ReturnsDbSet([communityEvent]);
        _contextMock.Setup(c => c.Attendees).ReturnsDbSet([]);

        // Act
        await _handler.Handle(command, CancellationToken.None);

        // Assert
        _contextMock.Verify(c => c.Attendees.AddAsync(It.Is<Attendee>(a => a.UserId == userId && a.EventId == eventId && a.Status == AttendeeStatus.Pending), It.IsAny<CancellationToken>()), Times.Once);
        _contextMock.Verify(c => c.SaveChangesAsync(It.IsAny<CancellationToken>()), Times.Once);
    }
}
