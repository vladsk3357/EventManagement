using EventManagement.Application.Common.Interfaces;
using EventManagement.Application.Communities.Commands.UnsubscribeCommunity;
using EventManagement.Domain.Entities.Community;
using EventManagement.Domain.Entities;
using MockQueryable.Moq;
using Moq;
using Moq.EntityFrameworkCore;
using EventManagement.Application.Common.Exceptions;

namespace EventManagement.Application.UnitTests.Communities.Commands;

public class UnsubscribeCommunityCommandHandlerTests
{
    private readonly Mock<IApplicationDbContext> _dbContextMock;
    private readonly Mock<ICurrentUserAccessor> _currentUserAccessorMock;

    public UnsubscribeCommunityCommandHandlerTests()
    {
        _dbContextMock = new Mock<IApplicationDbContext>();
        _currentUserAccessorMock = new Mock<ICurrentUserAccessor>();

        var communities = new List<Community>().AsQueryable().BuildMockDbSet();
        var subscriptions = new List<Subscription>().AsQueryable().BuildMockDbSet();

        _dbContextMock.Setup(c => c.Communities).ReturnsDbSet(communities.Object);
        _dbContextMock.Setup(c => c.Subscriptions).ReturnsDbSet(subscriptions.Object);
    }

    [Fact]
    public async Task Handle_UserUnsubscribed_RemovesSubscription()
    {
        // Arrange
        var userId = "user123";
        var communityId = 1;
        var community = new Community { Id = communityId, OrganizerId = "user3" };
        var command = new UnsubscribeCommunityCommand(communityId);
        var userCommunity = new Subscription { UserId = userId, CommunityId = communityId };

        _currentUserAccessorMock.Setup(c => c.UserId).Returns(userId);
        _dbContextMock.Setup(c => c.Subscriptions).Returns(new[] { userCommunity }.AsQueryable().BuildMockDbSet().Object);
        _dbContextMock.Setup(c => c.Communities).Returns(new[] { community }.AsQueryable().BuildMockDbSet().Object);

        var handler = new UnsubscribeCommunityCommandHandler(_dbContextMock.Object, _currentUserAccessorMock.Object);

        // Act
        await handler.Handle(command, CancellationToken.None);

        // Assert
        _dbContextMock.Verify(db => db.Subscriptions.Remove(userCommunity), Times.Once);
        _dbContextMock.Verify(db => db.SaveChangesAsync(CancellationToken.None), Times.Once);
    }

    [Fact]
    public async Task Handle_UserNotSubscribed_ThrowsValidationException()
    {
        // Arrange
        var userId = "user123";
        var communityId = 1;
        var community = new Community { Id = communityId, OrganizerId = "user3" };
        var command = new UnsubscribeCommunityCommand(communityId);

        _currentUserAccessorMock.Setup(c => c.UserId).Returns(userId);
        _dbContextMock.Setup(c => c.Subscriptions).Returns(new List<Subscription>().AsQueryable().BuildMockDbSet().Object);
        _dbContextMock.Setup(c => c.Communities).Returns(new[] { community }.AsQueryable().BuildMockDbSet().Object);

        var handler = new UnsubscribeCommunityCommandHandler(_dbContextMock.Object, _currentUserAccessorMock.Object);

        // Act & Assert
        await Assert.ThrowsAsync<ValidationException>(() => handler.Handle(command, CancellationToken.None));
    }

    [Fact]
    public async Task Handle_UserIsOrganizer_ThrowsValidationException()
    {
        // Arrange
        var userId = "user123";
        var communityId = 1;
        var command = new UnsubscribeCommunityCommand(communityId);
        var community = new Community { Id = communityId, OrganizerId = userId };
        var userCommunity = new Subscription { UserId = userId, CommunityId = communityId };

        _currentUserAccessorMock.Setup(c => c.UserId).Returns(userId);
        _dbContextMock.Setup(c => c.Communities).Returns(new[] { community }.AsQueryable().BuildMockDbSet().Object);
        _dbContextMock.Setup(c => c.Subscriptions).Returns(new[] { userCommunity }.AsQueryable().BuildMockDbSet().Object);

        var handler = new UnsubscribeCommunityCommandHandler(_dbContextMock.Object, _currentUserAccessorMock.Object);

        // Act & Assert
        await Assert.ThrowsAsync<ValidationException>(() => handler.Handle(command, CancellationToken.None));
    }
}
