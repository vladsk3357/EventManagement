using System.Linq.Expressions;
using System.Threading;
using Elastic.Clients.Elasticsearch;
using Elastic.Clients.Elasticsearch.Mapping;
using Elastic.Clients.Elasticsearch.QueryDsl;
using EventManagement.Application.Common.Services.Documents;
using EventManagement.Application.Common.Services.Search;
using EventManagement.Application.Services.Search;
using EventManagement.Domain.Entities.CommunityEvent;
using EventManagement.Infrastructure.Search.Documents.Event;
using EventManagement.Infrastructure.Search.Options;
using Microsoft.Extensions.Options;

namespace EventManagement.Infrastructure.Search;

internal class EventsSearchService(ElasticsearchClient client, IOptions<ElasticOptions> options)
    : IEventsSearchService
{
    private readonly ElasticsearchClient _client = client;
    private readonly ElasticOptions _options = options.Value;

    public async Task<bool> IndexAsync(EventIndexDocument @event, CancellationToken cancellationToken = default)
    {
        var document = @event.ToDocument();

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
                     .IntegerNumber(d => d.CommunityId)
                     .Date(d => d.StartDate)
                     .Date(d => d.EndDate)));
        }, cancellationToken);

        return createIndexResponse.IsSuccess();
    }

    public async Task<bool> DeleteAsync(int eventId, CancellationToken cancellationToken = default)
    {
        var result = await _client.DeleteAsync(_options.Indices.Event, eventId, cancellationToken);
        return result.IsSuccess();
    }

    public async Task<SearchResult<EventIndexDocument>> SuggestAsync(string term, int pageSize, CancellationToken cancellationToken = default)
    {
        var response = await _client.SearchAsync<EventDocument>(s => s
            .Index(_options.Indices.Event)
            .From(0)
            .Size(pageSize)
            .Query(q =>
                q.MultiMatch(m =>
                    m.Fields("name, name._2gram, name._3gram")
                    .Type(TextQueryType.BoolPrefix)
                    .Query(term))), cancellationToken);

        return new SearchResult<EventIndexDocument>(response.Documents.Select(d => d.ToIndexDocument()), 0, pageSize, response.Total);
    }

    public async Task<SearchResult<EventIndexDocument>> SearchAsync(Application.Common.Services.Search.SearchRequest<EventIndexDocument> request, CancellationToken cancellationToken = default)
    {
        var searchRequest = new SearchRequestDescriptor<EventDocument>()
            .Index(_options.Indices.Event)
            .From(request.Page * request.PageSize)
            .Size(request.PageSize);

        var queryDescriptor = new QueryDescriptor<EventDocument>()
            .MatchAll(x => x
                .QueryName("search-events"));

        if (request.Filters.Count > 0)
        {
            queryDescriptor = queryDescriptor.Bool(x => x
                .Filter(request.Filters.Select(f =>
                {
                    return f switch
                    {
                        TextFilter<EventIndexDocument> textFilter => Query.Terms(new TermsQuery
                        {
                            Field = textFilter.FieldSelector,
                            Terms = new TermsQueryField(textFilter.Values.Select(v => FieldValue.String((string)v)).ToArray()),
                        }),
                        RangeFilter<EventIndexDocument> rangeFilter => Query.Range(new RangeQuery(new DateRangeQuery(rangeFilter.FieldSelector)
                        {
                            Gte = (DateTime?)rangeFilter.From,
                            Lte = (DateTime?)rangeFilter.To
                        })),
                        _ => throw new ArgumentException("Unknown filter type")
                    };
                }).ToList()));
        }

        searchRequest = searchRequest.Query(queryDescriptor);

        if (!string.IsNullOrWhiteSpace(request.SortBy))
        {
            searchRequest = searchRequest.Sort(c => c
                .Field(request.SortBy, s => s
                    .Order(request.IsSortAscending ? SortOrder.Asc : SortOrder.Desc)));
        }

        var response = await _client.SearchAsync(searchRequest, cancellationToken);

        return new SearchResult<EventIndexDocument>(response.Documents.Select(d => d.ToIndexDocument()), request.Page, request.PageSize, response.Total);
    }
}
