using System.Linq.Expressions;
using EventManagement.Application.Common.Exceptions;
using EventManagement.Application.Common.Interfaces;
using EventManagement.Application.Communities.Queries.GetCommunityDetails;
using EventManagement.Domain.Entities;
using EventManagement.Domain.Entities.Community;
using EventManagement.Domain.Entities.Form;
using Microsoft.EntityFrameworkCore;
using Moq;
using Moq.EntityFrameworkCore;

namespace EventManagement.Application.UnitTests.Communities.Queries;

public class GetCommunityDetailsQueryHandlerTests
{
    private readonly Mock<IApplicationDbContext> _mockContext;
    private readonly Mock<ICurrentUserAccessor> _mockCurrentUserAccessor;
    private readonly Mock<IFileStorageService> _mockFileStorageService;
    private readonly GetCommunityDetailsQueryHandler _handler;

    public GetCommunityDetailsQueryHandlerTests()
    {
        _mockContext = new Mock<IApplicationDbContext>();
        _mockCurrentUserAccessor = new Mock<ICurrentUserAccessor>();
        _mockFileStorageService = new Mock<IFileStorageService>();
        _handler = new GetCommunityDetailsQueryHandler(
            _mockContext.Object,
            _mockCurrentUserAccessor.Object,
            _mockFileStorageService.Object);
    }

    [Fact]
    public async Task Handle_CommunityFound_ReturnsCommunityDetailsDto()
    {
        // Arrange
        var communityId = 1;
        var userId = "user1";
        var community = new Community
        {
            Id = communityId,
            SubscriptionForm = new CommunitySubscriptionForm { Form = new Form() },
            SocialMedia = new SocialMedia(),
            OrganizerId = userId,
            CommunityImage = "image.jpg"
        };

        var subscriptions = new List<Subscription>
        {
            new() { CommunityId = communityId, UserId = userId },
            new() { CommunityId = communityId, UserId = "user2" }
        };

        _mockContext.Setup(c => c.Communities).ReturnsDbSet([community]);
        _mockContext.Setup(c => c.Subscriptions).ReturnsDbSet(subscriptions);

        _mockCurrentUserAccessor.Setup(x => x.UserId).Returns(userId);

        _mockFileStorageService.Setup(x => x.GetFileUrlAsync(It.IsAny<string>(), It.IsAny<CancellationToken>()))
            .ReturnsAsync(new Uri("https://example.com/image.jpg"));

        var query = new GetCommunityDetailsQuery(communityId);

        // Act
        var result = await _handler.Handle(query, CancellationToken.None);

        // Assert
        Assert.NotNull(result);
        Assert.Equal(communityId, result.Id);
        Assert.Equal(2, result.SubscriberCount);
        Assert.True(result.IsSubscribed);
        Assert.NotNull(result.CommunityImageUrl);
    }

    [Fact]
    public async Task Handle_CommunityNotFound_ThrowsNotFoundException()
    {
        // Arrange
        var communityId = 1;
        _mockCurrentUserAccessor.Setup(x => x.UserId).Returns("user1");

        _mockContext.Setup(c => c.Communities).ReturnsDbSet([]);

        var query = new GetCommunityDetailsQuery(communityId);

        // Act & Assert
        await Assert.ThrowsAsync<NotFoundException>(() => _handler.Handle(query, CancellationToken.None));
    }

    [Fact]
    public async Task Handle_UserNotSubscribed_ReturnsCommunityDetailsDtoWithIsSubscribedFalse()
    {
        // Arrange
        var communityId = 1;
        var userId = "user1";
        var community = new Community
        {
            Id = communityId,
            SubscriptionForm = new CommunitySubscriptionForm { Form = new Form() },
            SocialMedia = new SocialMedia(),
            OrganizerId = "otherUser",
            CommunityImage = "image.jpg"
        };

        var subscriptions = new List<Subscription>
        {
            new() { CommunityId = communityId, UserId = "user2" },
            new() { CommunityId = communityId, UserId = "user3" }
        };

        _mockContext.Setup(c => c.Communities).ReturnsDbSet([community]);
        _mockContext.Setup(c => c.Subscriptions).ReturnsDbSet(subscriptions);

        _mockCurrentUserAccessor.Setup(x => x.UserId).Returns(userId);

        _mockFileStorageService.Setup(x => x.GetFileUrlAsync(It.IsAny<string>(), It.IsAny<CancellationToken>()))
            .ReturnsAsync(new Uri("https://example.com/image.jpg"));

        var query = new GetCommunityDetailsQuery(communityId);

        // Act
        var result = await _handler.Handle(query, CancellationToken.None);

        // Assert
        Assert.NotNull(result);
        Assert.Equal(communityId, result.Id);
        Assert.Equal(2, result.SubscriberCount);
        Assert.False(result.IsSubscribed);
        Assert.Equal("https://example.com/image.jpg", result.CommunityImageUrl);
    }
}
