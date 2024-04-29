using EventManagement.Application.Common.Services.Documents;
using EventManagement.Application.Services.Search;
using EventManagement.Domain.Entities.CommunityEvent;

namespace EventManagement.Application.Common.Services.Search;

public interface IEventsSearchService
{
    Task<bool> DeleteAsync(int eventId, CancellationToken cancellationToken = default);
    Task<bool> IndexAsync(EventIndexDocument @event, CancellationToken cancellationToken = default);
    Task<SearchResult<EventIndexDocument>> SuggestAsync(string term, int pageSize, CancellationToken cancellationToken = default);
    Task<SearchResult<EventIndexDocument>> SearchAsync(SearchRequest<EventIndexDocument> request, CancellationToken cancellation = default);
}