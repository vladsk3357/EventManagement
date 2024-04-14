using EventManagement.Domain.Entities;
using EventManagement.Infrastructure.Search.Documents;

namespace EventManagement.Application.Services.Search;

public interface ISearchService
{
    Task<bool> IndexCommunityAsync(Community community, CancellationToken cancellationToken = default);
    
    Task<SearchResult<CommunityDocument>> SearchCommunity(string term, int page, int pageSize);
    Task<SearchResult<CommunityDocument>> SuggestCommunities(string term, int pageSize);
}
