using Elastic.Clients.Elasticsearch;
using Elastic.Clients.Elasticsearch.Mapping;
using Elastic.Clients.Elasticsearch.QueryDsl;
using EventManagement.Application.Common.Services.Documents;
using EventManagement.Application.Common.Services.Search;
using EventManagement.Application.Services.Search;
using EventManagement.Domain.Entities.CommunityEvent;
using EventManagement.Infrastructure.Search.Options;
using Microsoft.Extensions.Options;

namespace EventManagement.Infrastructure.Search;

internal class EventsSearchService(ElasticsearchClient client, IOptions<ElasticOptions> options) 
    : IEventsSearchService
{
    private readonly ElasticsearchClient _client = client;
    private readonly ElasticOptions _options = options.Value;

    public async Task<bool> IndexAsync(Event @event, CancellationToken cancellationToken = default)
    {
        var document = new EventDocument(
            @event.Id,
            @event.Name,
            @event.Description,
            @event.Venue switch
            {
                OfflineEventVenue offline => offline.Location,
                OnlineEventVenue => "Онлайн",
                _ => throw new ArgumentOutOfRangeException(nameof(@event.Venue))
            },
            @event.CommunityId);

        await CreateIndexIfNotExistsAsync(cancellationToken);
        var result = await _client.IndexAsync(document, (IndexName)_options.Indices.Event, cancellationToken);
        return result.IsSuccess();
    }

    private async Task<bool> CreateIndexIfNotExistsAsync(CancellationToken cancellationToken = default)
    {
        var indexExistsResponse = await _client.Indices.ExistsAsync(_options.Indices.Event, cancellationToken);
        if (indexExistsResponse.Exists)
            return true;

        var createIndexResponse = await _client.Indices.CreateAsync(_options.Indices.Event, config =>
        {
            config.Mappings(m =>
                m.Dynamic(DynamicMapping.True)
                .Properties<EventDocument>(p =>
                    p.SearchAsYouType(d => d.Name)
                     .Text(d => d.Description)
                     .Text(d => d.Venue)
                     .IntegerNumber(d => d.CommunityId)));
        }, cancellationToken);

        return createIndexResponse.IsSuccess();
    }

    public async Task<bool> DeleteAsync(int eventId, CancellationToken cancellationToken = default)
    {
        var result = await _client.DeleteAsync(_options.Indices.Event, eventId, cancellationToken);
        return result.IsSuccess();
    }

    public async Task<SearchResult<EventDocument>> Suggest(string term, int pageSize)
    {
        var response = await _client.SearchAsync<EventDocument>(s => s
            .Index(_options.Indices.Event)
            .From(0)
            .Size(pageSize)
            .Query(q =>
                q.MultiMatch(m =>
                    m.Fields("name, name._2gram, name._3gram")
                    .Type(TextQueryType.BoolPrefix)
                    .Query(term))));

        return new SearchResult<EventDocument>(response.Documents, 0, pageSize, response.Total);
    }
}
