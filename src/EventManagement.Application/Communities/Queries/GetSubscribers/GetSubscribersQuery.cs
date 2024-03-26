using EventManagement.Application.Common.Interfaces;
using EventManagement.Application.Common.Pagination;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace EventManagement.Application.Communities.Queries.GetSubscribers;

public sealed record GetSubscribersQuery(
    int CommunityId, 
    int Page, 
    int PageSize) : PagedRequest(Page, PageSize), IRequest<PagedList<SubscriberDto>>;

internal sealed class GetSubscribersQueryHandler : IRequestHandler<GetSubscribersQuery, PagedList<SubscriberDto>>
{
    private readonly IApplicationDbContext _context;
    private readonly IUserService _userService;

    public GetSubscribersQueryHandler(IApplicationDbContext context, IUserService userService)
    {
        _context = context;
        _userService = userService;
    }

    public async Task<PagedList<SubscriberDto>> Handle(GetSubscribersQuery request, CancellationToken cancellationToken)
    {
        var subscriptionsQuery = _context.Subscriptions.Where(s => s.CommunityId == request.CommunityId);

        var totalCount = await subscriptionsQuery.CountAsync(cancellationToken);

        var subscribersIds = await subscriptionsQuery.Skip((request.Page - 1) * request.PageSize)
            .Take(request.PageSize)
            .Select(s => s.UserId)
            .ToListAsync(cancellationToken);

        var users = await _userService.GetUsersByIdListAsync(subscribersIds, cancellationToken);
        var dtos = users.Select(u => u.ToDto()).ToList();

        return PagedList<SubscriberDto>.Create(dtos, request.Page, request.PageSize, totalCount);
    }
}