using EventManagement.Application.Common.Interfaces;
using EventManagement.Application.Communities.Queries.GetSubscribedCommunities;
using EventManagement.Domain.Entities.Community;
using EventManagement.Domain.Entities;
using Moq;
using Moq.EntityFrameworkCore;

namespace EventManagement.Application.UnitTests.Communities.Queries;

public class GetSubscribedCommunitiesQueryHandlerTests
{
    private readonly Mock<IApplicationDbContext> _dbContextMock;
    private readonly Mock<ICurrentUserAccessor> _currentUserAccessorMock;

    public GetSubscribedCommunitiesQueryHandlerTests()
    {
        _dbContextMock = new Mock<IApplicationDbContext>();
        _currentUserAccessorMock = new Mock<ICurrentUserAccessor>();
    }

    [Fact]
    public async Task Handle_ReturnsCommunityDtoList()
    {
        // Arrange
        var userId = "user123";
        var communityId1 = 1;
        var communityId2 = 2;

        _currentUserAccessorMock.Setup(c => c.UserId).Returns(userId);

        var subscriptions = new List<Subscription>
        {
            new()
            {
                UserId = userId,
                CommunityId = communityId1,
                Community = new Community { Id = communityId1, Name = "Community 1" }
            },
            new()
            {
                UserId = userId,
                CommunityId = communityId2,
                Community = new Community { Id = communityId2, Name = "Community 2" }
            }
        };

        _dbContextMock.Setup(c => c.Subscriptions).ReturnsDbSet(subscriptions);

        var handler = new GetSubscribedCommunitiesQueryHandler(_dbContextMock.Object, _currentUserAccessorMock.Object);

        // Act
        var result = await handler.Handle(new GetSubscribedCommunitiesQuery(), CancellationToken.None);

        // Assert
        Assert.NotNull(result);
        Assert.Equal(2, result.Count);
        Assert.Equal(communityId1, result[0].Id);
        Assert.Equal("Community 1", result[0].Name);
        Assert.Equal(communityId2, result[^1].Id);
        Assert.Equal("Community 2", result[^1].Name);
    }

    [Fact]
    public async Task Handle_NoSubscribedCommunities_ReturnsEmptyList()
    {
        // Arrange
        var userId = "user123";

        _currentUserAccessorMock.Setup(c => c.UserId).Returns(userId);

        var subscriptions = new List<Subscription>().AsQueryable();

        _dbContextMock.Setup(c => c.Subscriptions).ReturnsDbSet(subscriptions);

        var handler = new GetSubscribedCommunitiesQueryHandler(_dbContextMock.Object, _currentUserAccessorMock.Object);

        // Act
        var result = await handler.Handle(new GetSubscribedCommunitiesQuery(), CancellationToken.None);

        // Assert
        Assert.NotNull(result);
        Assert.Empty(result);
    }
}
