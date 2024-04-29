using Elastic.Clients.Elasticsearch;
using Elastic.Clients.Elasticsearch.Mapping;
using Elastic.Clients.Elasticsearch.QueryDsl;
using EventManagement.Application.Common.Services.Documents;
using EventManagement.Application.Common.Services.Search;
using EventManagement.Application.Services.Search;
using EventManagement.Infrastructure.Search.Documents;
using EventManagement.Infrastructure.Search.Documents.Community;
using EventManagement.Infrastructure.Search.Options;
using Microsoft.Extensions.Options;

namespace EventManagement.Infrastructure.Search;

internal class CommunitiesSearchService(ElasticsearchClient client, IOptions<ElasticOptions> options)
    : ICommunitiesSearchService
{
    private readonly ElasticsearchClient _client = client;
    private readonly ElasticOptions _options = options.Value;

    public async Task<bool> IndexAsync(CommunityIndexDocument community, CancellationToken cancellationToken = default)
    {
        var document = community.ToDocument();

        await CreateCommunityIndexIfNotExistsAsync(cancellationToken);
        var result = await _client.IndexAsync(document, (IndexName)_options.Indices.Community, cancellationToken);
        return result.IsSuccess();
    }

    private async Task<bool> CreateCommunityIndexIfNotExistsAsync(CancellationToken cancellationToken = default)
    {
        var indexExistsResponse = await _client.Indices.ExistsAsync(_options.Indices.Community, cancellationToken);
        if (indexExistsResponse.Exists)
            return true;

        var createIndexResponse = await _client.Indices.CreateAsync(_options.Indices.Community, config =>
            {
                config.Mappings(m => m
                    .Dynamic(DynamicMapping.True)
                    .Properties<CommunityDocument>(p => p
                        .SearchAsYouType(d => d.NameSuggestion)
                        .Keyword(d => d.Name)
                        .Keyword(d => d.Domain)
                        .Text(d => d.Description)
                        .Keyword(d => d.Location)));
            }, cancellationToken);

        return createIndexResponse.IsSuccess();
    }

    public async Task<bool> DeleteAsync(int id, CancellationToken cancellationToken = default)
    {
        var request = new DeleteRequest<CommunityDocument>(_options.Indices.Community, id);
        var result = await _client.DeleteAsync(request, cancellationToken);
        return result.IsSuccess();
    }

    public async Task<bool> UpdateSubscribersCountAsync(int communityId, int subscribersCount, CancellationToken cancellationToken = default)
    {
        var document = new UpdateSubscribersCountDocument(subscribersCount);

        var request = new UpdateRequest<CommunityDocument, UpdateSubscribersCountDocument>(_options.Indices.Community, communityId)
        {
            Doc = document
        };

        var result = await _client.UpdateAsync(request, cancellationToken);
        return result.IsSuccess();
    }

    public async Task<SearchResult<CommunityIndexDocument>> SearchCommunity(string term, int page, int pageSize)
    {
        var response = await _client.SearchAsync<CommunityDocument>(s => s
            .Index(_options.Indices.Community)
            .From(page * pageSize)
            .Size(pageSize)
            .Query(q =>
                q.MultiMatch(m =>
                    m.Fields("name, description, location")
                     .Query(term))));

        return new SearchResult<CommunityIndexDocument>(response.Documents.Select(d => d.ToIndexDocument()), page, pageSize, response.Total);
    }

    public async Task<SearchResult<CommunityIndexDocument>> Suggest(string term, int pageSize)
    {
        var response = await _client.SearchAsync<CommunityDocument>(s => s
            .Index(_options.Indices.Community)
            .From(0)
            .Size(pageSize)
            .Query(q =>
                q.MultiMatch(m =>
                    m.Fields("nameSuggestion, nameSuggestion._2gram, nameSuggestion._3gram")
                    .Type(TextQueryType.BoolPrefix)
                    .Query(term))));

        return new SearchResult<CommunityIndexDocument>(response.Documents.Select(d => d.ToIndexDocument()), 0, pageSize, response.Total);
    }

    public async Task<SearchResult<CommunityIndexDocument>> SearchAsync(Application.Common.Services.Search.SearchRequest<CommunityIndexDocument> request, CancellationToken cancellationToken = default)
    {
        var searchRequest = new SearchRequestDescriptor<CommunityDocument>()
            .Index(_options.Indices.Community)
            .From(request.Page * request.PageSize)
            .Size(request.PageSize);

        var queryDescriptor = new QueryDescriptor<CommunityDocument>()
            .MatchAll(x => x
                .QueryName("search-communities"));

        if (request.Filters.Count > 0)
        {
            queryDescriptor = queryDescriptor.Bool(x => x
                .Filter(request.Filters.Select(f =>
                {
                    return f switch
                    {
                        TextFilter<CommunityIndexDocument> textFilter => Query.Terms(new TermsQuery
                        {
                            Field = textFilter.FieldSelector,
                            Terms = new TermsQueryField(textFilter.Values.Select(v => FieldValue.String((string)v)).ToArray()),
                        }),
                        RangeFilter<CommunityIndexDocument> rangeFilter => Query.Range(new RangeQuery(new DateRangeQuery(rangeFilter.FieldSelector)
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

        return new SearchResult<CommunityIndexDocument>(response.Documents.Select(d => d.ToIndexDocument()), request.Page, request.PageSize, response.Total);
    }

    public async Task<FacetedFilter> GetFacetedFilterAsync(CancellationToken cancellationToken = default)
    {
        var searchRequest = new SearchRequestDescriptor<CommunityDocument>()
            .Index(_options.Indices.Community)
            .Size(0)
            .Aggregations(a => a
                .Add("location", x => x.Terms(x => x.Field(x => x.Location)))
                .Add("domain", x => x.Terms(x => x.Field(x => x.Domain))));

        var response = await _client.SearchAsync(searchRequest, cancellationToken);
        return new FacetedFilter(
            [
                new("location", response.Aggregations.GetStringTerms("location").Buckets.Select(b => new FacetValue(b.Key.Value.ToString(), b.DocCount))),
                new("domain", response.Aggregations.GetStringTerms("domain").Buckets.Select(b => new FacetValue(b.Key.Value.ToString(), b.DocCount)))
            ]);
    }
}
