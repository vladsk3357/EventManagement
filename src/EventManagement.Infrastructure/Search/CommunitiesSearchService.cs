using Elastic.Clients.Elasticsearch;
using Elastic.Clients.Elasticsearch.IndexManagement;
using Elastic.Clients.Elasticsearch.Mapping;
using Elastic.Clients.Elasticsearch.QueryDsl;
using EventManagement.Application.Services.Search;
using EventManagement.Domain.Entities;
using EventManagement.Infrastructure.Search.Documents;
using EventManagement.Infrastructure.Search.Options;
using Microsoft.Extensions.Options;

namespace EventManagement.Infrastructure.Search;

internal class CommunitiesSearchService(ElasticsearchClient client, IOptions<ElasticOptions> options)
    : ICommunitiesSearchService
{
    private readonly ElasticsearchClient _client = client;
    private readonly ElasticOptions _options = options.Value;

    public async Task<bool> IndexAsync(Community community, CancellationToken cancellationToken = default)
    {
        var document = new CommunityDocument(
            community.Id,
            community.Name,
            community.Description,
            community.Location);

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
                config.Mappings(m =>
                    m.Dynamic(DynamicMapping.True)
                    .Properties<CommunityDocument>(p =>
                        p.SearchAsYouType(d => d.Name)
                         .Text(d => d.Description)
                         .Text(d => d.Location)));
            }, cancellationToken);

        return createIndexResponse.IsSuccess();
    }

    public async Task<bool> DeleteAsync(int id, CancellationToken cancellationToken = default)
    {
        var request = new DeleteRequest<CommunityDocument>(_options.Indices.Community, id);
        var result = await _client.DeleteAsync(request, cancellationToken);
        return result.IsSuccess();
    }

    public async Task<SearchResult<CommunityDocument>> SearchCommunity(string term, int page, int pageSize)
    {
        var response = await _client.SearchAsync<CommunityDocument>(s => s
            .Index(_options.Indices.Community)
            .From(page * pageSize)
            .Size(pageSize)
            .Query(q =>
                q.MultiMatch(m =>
                    m.Fields("name, description, location")
                     .Query(term))));

        return new SearchResult<CommunityDocument>(response.Documents, response.Total);
    }

    public async Task<SearchResult<CommunityDocument>> Suggest(string term, int pageSize)
    {
        //var response = await _client.SearchAsync<CommunityDocument>(s => s
        //    .Index(_options.Indices.Community)
        //    .From(0)
        //    .Size(pageSize)
        //    .Suggest(s => s.Suggesters(s => s.Add("communitySuggest", sg => 
        //        sg.Prefix(term)
        //        .Completion(c => c.Field(f => f.Name))))));

        var response = await _client.SearchAsync<CommunityDocument>(s => s
            .Index(_options.Indices.Community)
            .From(0)
            .Size(pageSize)
            .Query(q =>
                q.MultiMatch(m =>
                    m.Fields("name, name._2gram, name._3gram")
                    .Type(TextQueryType.BoolPrefix)
                    .Query(term))));

        return new SearchResult<CommunityDocument>(response.Documents, response.Total);
    }
}
