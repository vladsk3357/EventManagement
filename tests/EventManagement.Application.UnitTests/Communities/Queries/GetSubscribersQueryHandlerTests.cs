using EventManagement.Application.Common.Interfaces;
using EventManagement.Application.Communities.Queries.GetSubscribers;
using EventManagement.Domain.Entities;
using Moq;
using Moq.EntityFrameworkCore;

namespace EventManagement.Application.UnitTests.Communities.Queries;

public class GetSubscribersQueryHandlerTests
{
    private readonly Mock<IApplicationDbContext> _dbContextMock;
    private readonly Mock<IUserService> _userServiceMock;

    public GetSubscribersQueryHandlerTests()
    {
        _dbContextMock = new Mock<IApplicationDbContext>();
        _userServiceMock = new Mock<IUserService>();
    }

    [Fact]
    public async Task Handle_ReturnsSubscribersDtoList()
    {
        // Arrange
        var communityId = 1;
        var page = 1;
        var pageSize = 10;

        var subscribers = new List<Subscription>
        {
            new() { UserId = "user1", CommunityId = communityId },
            new() { UserId = "user2", CommunityId = communityId }
        };

        var users = new List<User>
        {
            new() { Id = "user1", Name = "user1" },
            new() { Id = "user2", Name = "user2" }
        };

        _dbContextMock.Setup(c => c.Subscriptions).ReturnsDbSet(subscribers);
        _userServiceMock.Setup(u => u.GetUsersByIdListAsync(It.IsAny<IEnumerable<string>>(), It.IsAny<CancellationToken>()))
            .ReturnsAsync(users);

        var handler = new GetSubscribersQueryHandler(_dbContextMock.Object, _userServiceMock.Object);
        var query = new GetSubscribersQuery(communityId, page, pageSize);

        // Act
        var result = await handler.Handle(query, CancellationToken.None);

        // Assert
        Assert.NotNull(result);
        Assert.Equal(2, result.Items.Count);
        Assert.Equal("user1", result.Items[0].Name);
        Assert.Equal("user2", result.Items[1].Name);
    }

    [Fact]
    public async Task Handle_ReturnsPagedListWithCorrectPagination()
    {
        // Arrange
        var communityId = 1;
        var page = 2;
        var pageSize = 10;

        var subscribers = Enumerable.Range(1, 20).Select(i => new Subscription { UserId = $"user{i}", CommunityId = communityId });
        var subscribersQueryable = subscribers.AsQueryable();

        var users = subscribers.Select(s => new User { Id = s.UserId, Name = s.UserId }).ToList();
        
        // Prepare a sublist of users to match the requested user IDs
        var usersSubset = users.Skip((page - 1) * pageSize).Take(pageSize).ToList();

        _dbContextMock.Setup(c => c.Subscriptions).ReturnsDbSet(subscribersQueryable);
        _userServiceMock.Setup(u => u.GetUsersByIdListAsync(It.IsAny<IEnumerable<string>>(), It.IsAny<CancellationToken>()))
            .ReturnsAsync(usersSubset);

        var handler = new GetSubscribersQueryHandler(_dbContextMock.Object, _userServiceMock.Object);
        var query = new GetSubscribersQuery(communityId, page, pageSize);

        // Act
        var result = await handler.Handle(query, CancellationToken.None);

        // Assert
        Assert.NotNull(result);
        Assert.Equal(10, result.Items.Count); // page size
        Assert.Equal(20, result.TotalCount); // total count of subscribers
        Assert.Equal(2, result.Page); // current page
        Assert.Equal(10, result.PageSize); // page size
    }
}
