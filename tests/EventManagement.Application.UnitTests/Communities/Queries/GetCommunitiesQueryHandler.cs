using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using EventManagement.Application.Common.Interfaces;
using EventManagement.Application.Common.Services.Documents;
using EventManagement.Application.Common.Services.Search;
using EventManagement.Application.Communities.Queries.GetCommunities;
using EventManagement.Application.Services.Search;
using EventManagement.Domain.Entities.Community;
using Moq;
using Moq.EntityFrameworkCore;

namespace EventManagement.Application.UnitTests.Communities.Queries;

public class GetCommunitiesQueryHandlerTests
{
    private readonly Mock<IApplicationDbContext> _mockContext;
    private readonly Mock<ICommunitiesSearchService> _mockCommunitiesSearchService;
    private readonly Mock<IFileStorageService> _mockFileStorageService;
    private readonly GetCommunitiesQueryHandler _handler;

    public GetCommunitiesQueryHandlerTests()
    {
        _mockContext = new Mock<IApplicationDbContext>();
        _mockCommunitiesSearchService = new Mock<ICommunitiesSearchService>();
        _mockFileStorageService = new Mock<IFileStorageService>();
        _handler = new GetCommunitiesQueryHandler(
            _mockContext.Object,
            _mockCommunitiesSearchService.Object,
            _mockFileStorageService.Object);
    }

    [Fact]
    public async Task Handle_SearchResultsFound_ReturnsPagedListOfCommunityDto()
    {
        // Arrange
        var communityId1 = 1;
        var communityId2 = 2;
        var community1 = new Community { Id = communityId1, CommunityImage = "image1.jpg" };
        var community2 = new Community { Id = communityId2, CommunityImage = "image2.jpg" };

        var searchResult = new SearchResult<CommunityIndexDocument>(
            [
                new(communityId1, "Community 1", "Description 1", "Location 1", "Domain 1", 10),
                new(communityId2, "Community 2", "Description 2", "Location 2", "Domain 2", 20)
            ],
            0,
            10,
            2
        );

        var communities = new List<Community> { community1, community2 };
        var communityImages = new Dictionary<string, Uri>
        {
            { "image1.jpg", new Uri("https://example.com/image1.jpg") },
            { "image2.jpg", new Uri("https://example.com/image2.jpg") }
        };

        _mockContext.Setup(c => c.Communities)
            .ReturnsDbSet(communities);

        _mockCommunitiesSearchService.Setup(s => s.SearchAsync(It.IsAny<SearchRequest<CommunityIndexDocument>>(), It.IsAny<CancellationToken>()))
            .ReturnsAsync(searchResult);

        _mockFileStorageService.Setup(s => s.GetFileUrlsAsync(It.IsAny<IEnumerable<string>>(), It.IsAny<CancellationToken>()))
            .ReturnsAsync(communityImages);

        var query = new GetCommunitiesQuery(null, null, 1, 10, null, null);

        // Act
        var result = await _handler.Handle(query, CancellationToken.None);

        // Assert
        Assert.NotNull(result);
        Assert.Equal(2, result.Items.Count);
        Assert.Equal(communityId1, result.Items[0].Id);
        Assert.Equal("Community 1", result.Items[0].Name);
        Assert.Equal("https://example.com/image1.jpg", result.Items[0].CommunityImageUrl);
        Assert.Equal(communityId2, result.Items[1].Id);
        Assert.Equal("Community 2", result.Items[1].Name);
        Assert.Equal("https://example.com/image2.jpg", result.Items[1].CommunityImageUrl);
    }

    [Fact]
    public async Task Handle_SearchResultsEmpty_ReturnsEmptyPagedList()
    {
        // Arrange
        var searchResult = new SearchResult<CommunityIndexDocument>([], 0, 10, 0);

        _mockContext.Setup(c => c.Communities)
            .ReturnsDbSet(new List<Community>());

        _mockCommunitiesSearchService.Setup(s => s.SearchAsync(It.IsAny<SearchRequest<CommunityIndexDocument>>(), It.IsAny<CancellationToken>()))
            .ReturnsAsync(searchResult);

        var query = new GetCommunitiesQuery(null, null, 1, 10, null, null);

        // Act
        var result = await _handler.Handle(query, CancellationToken.None);

        // Assert
        Assert.NotNull(result);
        Assert.Empty(result.Items);
    }

    [Fact]
    public async Task Handle_FileStorageServiceReturnsNullForImageUrls_ReturnsPagedListWithNullImages()
    {
        // Arrange
        var communityId1 = 1;
        var communityId2 = 2;
        var community1 = new Community { Id = communityId1, CommunityImage = "image1.jpg" };
        var community2 = new Community { Id = communityId2, CommunityImage = "image2.jpg" };

        var searchResult = new SearchResult<CommunityIndexDocument>(
            [
                new(communityId1, "Community 1", "Description 1", "Location 1", "Domain 1", 10),
                new(communityId2, "Community 2", "Description 2", "Location 2", "Domain 2", 20)
            ],
            0,
            10,
            2
        );

        var communities = new List<Community> { community1, community2 };

        _mockContext.Setup(c => c.Communities)
            .ReturnsDbSet(communities);

        _mockCommunitiesSearchService.Setup(s => s.SearchAsync(It.IsAny<SearchRequest<CommunityIndexDocument>>(), It.IsAny<CancellationToken>()))
            .ReturnsAsync(searchResult);

        _mockFileStorageService.Setup(s => s.GetFileUrlsAsync(It.IsAny<IEnumerable<string>>(), It.IsAny<CancellationToken>()))
            .ReturnsAsync([]);

        var query = new GetCommunitiesQuery(null, null, 1, 10, null, null);

        // Act
        var result = await _handler.Handle(query, CancellationToken.None);

        // Assert
        Assert.NotNull(result);
        Assert.Equal(2, result.Items.Count);
        Assert.Null(result.Items[0].CommunityImageUrl);
        Assert.Null(result.Items[1].CommunityImageUrl);
    }
}