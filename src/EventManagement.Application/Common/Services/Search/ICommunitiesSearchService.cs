using EventManagement.Application.Common.Services.Documents;
using EventManagement.Application.Common.Services.Search;

namespace EventManagement.Application.Services.Search;

public interface ICommunitiesSearchService
{
    Task<bool> DeleteAsync(int id, CancellationToken cancellationToken = default);
    Task<FacetedFilter> GetFacetedFilterAsync(CancellationToken cancellationToken = default);
    Task<bool> IndexAsync(CommunityIndexDocument community, CancellationToken cancellationToken = default);
    Task<SearchResult<CommunityIndexDocument>> SearchAsync(SearchRequest<CommunityIndexDocument> request, CancellationToken cancellationToken = default);
    Task<SearchResult<CommunityIndexDocument>> SearchCommunity(string term, int page, int pageSize);
    Task<SearchResult<CommunityIndexDocument>> Suggest(string term, int pageSize);
    Task<bool> UpdateSubscribersCountAsync(int communityId, int subscribersCount, CancellationToken cancellationToken = default);
}
