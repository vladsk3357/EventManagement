using EventManagement.Application.Common.Interfaces;
using EventManagement.Application.Common.Models;
using EventManagement.Application.Common.Pagination;
using EventManagement.Application.Search.Queries.Search.Dtos;
using EventManagement.Application.Search.Queries.Search.Request;
using EventManagement.Application.Search.Queries.Search.Response;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace EventManagement.Application.Search.Queries.Search;

public sealed record SearchQuery(IReadOnlyList<SearchRequestDto> Requests) : IRequest<List<SearchResultDto>>;

internal sealed class SearchResultQueryHandler : IRequestHandler<SearchQuery, List<SearchResultDto>>
{
    private readonly IApplicationDbContext _context;


    public SearchResultQueryHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<List<SearchResultDto>> Handle(SearchQuery request, CancellationToken cancellationToken)
    {
        var result = new List<SearchResultDto>();
        foreach (var searchRequest in request.Requests)
        {
            object searchResult = searchRequest.IndexName.ToLower() switch
            {
                "communities" => await SearchCommunities(searchRequest, result),
                "events" => await SearchEvents(searchRequest, result),
                "users" => await SearchUsers(searchRequest, result),
                _ => throw new ArgumentException($"Index {searchRequest.IndexName} not found")
            };


           
            //result.Add(new SearchResultDto(searchRequest.IndexName, searchResult));
        }

        return result;
    }

    private Task<PagedList<object>> SearchUsers(SearchRequestDto searchRequest, List<SearchResultDto> result)
    {
        throw new NotImplementedException();
    }

    private Task<PagedList<object>> SearchEvents(SearchRequestDto searchRequest, List<SearchResultDto> result)
    {
        throw new NotImplementedException();
    }

    private async Task<PagedList<CommunitySearchResultItemDto>> SearchCommunities(SearchRequestDto request, List<SearchResultDto> result)
    {
        var communitiesQuery = _context.Communities.AsQueryable();

        if (!string.IsNullOrWhiteSpace(request.SearchTerm))
            communitiesQuery = communitiesQuery.Where(c => c.Name.Contains(request.SearchTerm)
            || c.Description.Contains(request.SearchTerm)
            || c.Domain.Contains(request.SearchTerm)
            || (!string.IsNullOrWhiteSpace(c.ShortDescription) && c.ShortDescription.Contains(request.SearchTerm))
            || c.Location.Contains(request.SearchTerm));


        var communitiesDtosQuery = _context.Communities
            .Take(request.PageSize)
            .Select(c => new CommunitySearchResultItemDto(c.Id, c.Name));

        return await PagedList<CommunitySearchResultItemDto>.CreateAsync(communitiesDtosQuery, 0, request.PageSize);
    }
}