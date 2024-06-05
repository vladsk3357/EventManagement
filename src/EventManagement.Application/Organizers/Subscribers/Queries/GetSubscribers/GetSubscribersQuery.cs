using EventManagement.Application.Common.Exceptions;
using EventManagement.Application.Common.Interfaces;
using EventManagement.Application.Common.Pagination;
using EventManagement.Application.Common.Security;
using EventManagement.Domain.Entities.Community;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace EventManagement.Application.Organizers.Subscribers.Queries.GetSubscribers;

[Authorize]
public sealed record GetSubscribersQuery(
    int CommunityId, 
    int Page,
    int PageSize) : PagedRequest(Page, PageSize), IRequest<PagedList<SubscriberDto>>;

internal sealed class GetSubscribersQueryHandler : IRequestHandler<GetSubscribersQuery, PagedList<SubscriberDto>>
{
    private readonly IApplicationDbContext _context;
    private readonly IUserService _userService;
    private readonly ICurrentUserAccessor _currentUserAccessor;

    public GetSubscribersQueryHandler(
        IApplicationDbContext context,
        IUserService userService,
        ICurrentUserAccessor currentUserAccessor)
    {
        _context = context;
        _userService = userService;
        _currentUserAccessor = currentUserAccessor;
    }

    public async Task<PagedList<SubscriberDto>> Handle(GetSubscribersQuery request, CancellationToken cancellationToken)
    {
        var @event = await _context.Communities.FirstOrDefaultAsync(e => e.Id == request.CommunityId && e.OrganizerId == _currentUserAccessor.UserId, cancellationToken)
            ?? throw new NotFoundException(nameof(Community), request.CommunityId);

        var subscriptionsQuery = _context.Subscriptions.Where(s => s.CommunityId == request.CommunityId);
        var totalCount = await subscriptionsQuery.CountAsync(cancellationToken);
        var subscribers = await subscriptionsQuery.Skip((request.Page - 1) * request.PageSize)
            .Take(request.PageSize)
            .ToListAsync(cancellationToken);

        var users = await _userService.GetUsersByIdListAsync(subscribers.Select(s => s.UserId), cancellationToken);
        var usersDict = users.ToDictionary(u => u.Id);
        var attendeesDto = subscribers.Select(a => new SubscriberDto(a.UserId, usersDict[a.UserId].UserName, usersDict[a.UserId].Name, a.Created))
            .ToList();

        return PagedList<SubscriberDto>.Create(attendeesDto, request.Page, request.PageSize, totalCount);
    }
}   
