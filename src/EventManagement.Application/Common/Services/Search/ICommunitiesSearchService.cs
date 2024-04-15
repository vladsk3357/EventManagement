using EventManagement.Domain.Entities;
using EventManagement.Infrastructure.Search.Documents;

namespace EventManagement.Application.Services.Search;

public interface ICommunitiesSearchService
{
    Task<bool> DeleteAsync(int id, CancellationToken cancellationToken = default);
    Task<bool> IndexAsync(Community community, CancellationToken cancellationToken = default);
    Task<SearchResult<CommunityDocument>> SearchCommunity(string term, int page, int pageSize);
    Task<SearchResult<CommunityDocument>> Suggest(string term, int pageSize);
}
