using EventManagement.Application.Common.Exceptions;
using EventManagement.Application.Common.Interfaces;
using EventManagement.Application.Events.Commands.CancelEventAttendance;
using EventManagement.Domain.Entities;
using Moq;
using Moq.EntityFrameworkCore;

namespace EventManagement.Application.UnitTests.Events.Commands;

public class CancelEventAttendanceCommandHandlerTests
{
    private readonly Mock<IApplicationDbContext> _contextMock;
    private readonly Mock<ICurrentUserAccessor> _currentUserAccessorMock;
    private readonly CancelEventAttendanceCommandHandler _handler;

    public CancelEventAttendanceCommandHandlerTests()
    {
        _contextMock = new Mock<IApplicationDbContext>();
        _currentUserAccessorMock = new Mock<ICurrentUserAccessor>();

        _handler = new CancelEventAttendanceCommandHandler(_contextMock.Object, _currentUserAccessorMock.Object);
    }

    [Fact]
    public async Task Handle_UserNotAttendingEvent_ThrowsInvalidRequestException()
    {
        // Arrange
        var userId = "user-1";
        var command = new CancelEventAttendanceCommand(1);

        _currentUserAccessorMock.Setup(a => a.UserId).Returns(userId);
        _contextMock.Setup(c => c.Attendees).ReturnsDbSet([]);

        // Act & Assert
        var exception = await Assert.ThrowsAsync<InvalidRequestException>(() => _handler.Handle(command, CancellationToken.None));
    }

    [Fact]
    public async Task Handle_UserIsAttendingEvent_RemovesAttendance()
    {
        // Arrange
        var userId = "user-1";
        var eventId = 1;
        var command = new CancelEventAttendanceCommand(eventId);
        var attendee = new Attendee { UserId = userId, EventId = eventId };

        _currentUserAccessorMock.Setup(a => a.UserId).Returns(userId);
        _contextMock.Setup(c => c.Attendees).ReturnsDbSet([attendee]);

        // Act
        await _handler.Handle(command, CancellationToken.None);

        // Assert
        _contextMock.Verify(c => c.Attendees.Remove(attendee), Times.Once);
        _contextMock.Verify(c => c.SaveChangesAsync(It.IsAny<CancellationToken>()), Times.Once);
    }
}
