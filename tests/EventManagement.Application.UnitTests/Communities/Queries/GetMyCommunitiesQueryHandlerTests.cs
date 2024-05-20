using EventManagement.Application.Common.Interfaces;
using EventManagement.Application.Communities.Queries.GetMyCommunities;
using EventManagement.Domain.Entities.Community;
using EventManagement.Domain.Entities;
using Moq;
using Moq.EntityFrameworkCore;

namespace EventManagement.Application.UnitTests.Communities.Queries;

public class GetMyCommunitiesQueryHandlerTests
{
    [Fact]
    public async Task Handle_ReturnsCommunitiesDtoList()
    {
        // Arrange
        var userId = "user123";
        var communityId1 = 1;
        var communityId2 = 2;

        var currentUserAccessorMock = new Mock<ICurrentUserAccessor>();
        currentUserAccessorMock.Setup(c => c.UserId).Returns(userId);

        var fileStorageServiceMock = new Mock<IFileStorageService>();

        var communities = new List<Community>
        {
            new()
            {
                Id = communityId1,
                Name = "Community 1",
                OrganizerId = userId,
                Subscriptions = [new Subscription()]
            },
            new()
            {
                Id = communityId2,
                Name = "Community 2",
                Subscriptions = [new Subscription()]
            }
        };

        var subscriptions = new List<Subscription>
        {
            new() { UserId = userId, CommunityId = communityId1, Community = communities[0] },
            new() { UserId = userId, CommunityId = communityId2, Community = communities[1] }
        };

        var dbContextMock = new Mock<IApplicationDbContext>();
        dbContextMock.Setup(c => c.Subscriptions).ReturnsDbSet(subscriptions);
        dbContextMock.Setup(c => c.Communities).ReturnsDbSet(communities);

        var handler = new GetMyCommunitiesQueryHandler(
            dbContextMock.Object, 
            currentUserAccessorMock.Object, 
            fileStorageServiceMock.Object);

        // Act
        var result = await handler.Handle(new GetMyCommunitiesQuery(), CancellationToken.None);

        // Assert
        Assert.NotNull(result);
        Assert.Equal(2, result.Items.Count);
        Assert.Equal(communityId1, result.Items.First().Id);
        Assert.Equal("Community 1", result.Items.First().Name);
        Assert.Equal(1, result.Items.First().SubscribersCount);
        Assert.True(result.Items.First().IsOwner);
        Assert.Equal(communityId2, result.Items.Last().Id);
        Assert.Equal("Community 2", result.Items.Last().Name);
        Assert.Equal(1, result.Items.Last().SubscribersCount);
        Assert.False(result.Items.Last().IsOwner);
    }
}
