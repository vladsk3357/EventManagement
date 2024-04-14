using Elastic.Clients.Elasticsearch;
using Elastic.Clients.Elasticsearch.IndexManagement;
using Elastic.Clients.Elasticsearch.Mapping;
using EventManagement.Application.Services.Search;
using EventManagement.Domain.Entities;
using EventManagement.Infrastructure.Search.Documents;
using EventManagement.Infrastructure.Search.Options;
using Microsoft.Extensions.Options;

namespace EventManagement.Infrastructure.Search;

internal class SearchService(ElasticsearchClient client, IOptions<ElasticOptions> options)
    : ISearchService
{
    private readonly ElasticsearchClient _client = client;
    private readonly ElasticOptions _options = options.Value;

    public async Task<bool> IndexCommunityAsync(Community community, CancellationToken cancellationToken = default)
    {
        var document = new CommunityDocument(
            community.Id,
            community.Name,
            community.Description,
            community.Location);

        //_client.Indices.PutSettingsAsync(_options.Indices.Community, s => s
        //    .Settings(st => st
        //        .Analysis(a => a
        //            .Analyzers(an => an
        //                .Custom("ukrainian", c => c
        //                    .Tokenizer("standard")
        //                    .Filters("lowercase", "ukrainian_stop", "ukrainian_stemmer"))
        //                    .Custom("ukrainian_search", c => c
        //                        .Tokenizer("standard")
        //                        .Filters("lowercase", "ukrainian_stop"))))));

        await CreateCommunityIndexIfNotExistsAsync(cancellationToken);
        var result = await _client.IndexAsync(document, _options.Indices.Community, cancellationToken);
        return result.IsSuccess();
    }

    private async Task<bool> CreateCommunityIndexIfNotExistsAsync(CancellationToken cancellationToken = default)
    {
        var indexExistsResponse = await _client.Indices.ExistsAsync(_options.Indices.Community, cancellationToken);
        if (indexExistsResponse.Exists)
            return true;

        var createIndexResponse = await _client.Indices.CreateAsync(_options.Indices.Community, config =>
            {
                config.Settings(s =>
                    s.Analysis(a =>
                        a.Tokenizers(t =>
                            t.EdgeNGram("community-tokenizer", a => a.MaxGram(10)))));

                config.Mappings(m =>
                    m.Dynamic(DynamicMapping.True)
                    .Properties<CommunityDocument>(p =>
                        p.Text(d => d.Name)
                         .Text(d => d.Description)
                         .Text(d => d.Location)));
            }, cancellationToken);

        return createIndexResponse.IsSuccess();
    }

    public async Task<bool> DeleteCommunity(int id, CancellationToken cancellationToken = default)
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

    public async Task<SearchResult<CommunityDocument>> SuggestCommunities(string term, int pageSize)
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
                q.Match(m =>
                    m.Field(f => f.Name)
                    .Query(term)
                    .Fuzziness(new Fuzziness("AUTO")))));

        return new SearchResult<CommunityDocument>(response.Documents, response.Total);
    }
}
