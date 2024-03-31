using EventManagement.Application.Common.Interfaces;
using EventManagement.Application.Common.Pagination;
using EventManagement.Application.Common.Security;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace EventManagement.Application.Organizers.CommunitySubscriptionForms.Queries.GetCommunitySubscriptionFormAnswers;

[Authorize]
public sealed record GetCommunitySubscriptionFormAnswersQuery(
    int CommunityId,
    int Page,
    int PageSize) : PagedRequest(Page, PageSize), IRequest<PagedList<FormAnswerDto>>;

internal sealed class GetCommunitySubscriptionFormAnswersQueryHandler : IRequestHandler<GetCommunitySubscriptionFormAnswersQuery, PagedList<FormAnswerDto>>
{
    private readonly IApplicationDbContext _context;
    private readonly ICurrentUserAccessor _currentUserAccessor;
    private readonly IUserService _userService;

    public GetCommunitySubscriptionFormAnswersQueryHandler(
        IApplicationDbContext context,
        ICurrentUserAccessor currentUserAccessor,
        IUserService userService)
    {
        _context = context;
        _currentUserAccessor = currentUserAccessor;
        _userService = userService;
    }

    public async Task<PagedList<FormAnswerDto>> Handle(GetCommunitySubscriptionFormAnswersQuery request, CancellationToken cancellationToken)
    {
        var user = await _userService.GetUserByIdAsync(_currentUserAccessor.UserId, cancellationToken);
        var answersQuery = _context.Communities
            .Where(c => c.Id == request.CommunityId && c.OrganizerId == _currentUserAccessor.UserId)
            .Include(c => c.SubscriptionForm)
            .ThenInclude(f => f.Form)
            .ThenInclude(f => f.Answers)
            .SelectMany(c => c.SubscriptionForm.Form.Answers)
            .OrderByDescending(a => a.Created);

        var totalCount = await answersQuery.CountAsync(cancellationToken);
        var answers = await answersQuery.Skip((request.Page - 1) * request.PageSize)
         .Take(request.PageSize)
         .ToListAsync(cancellationToken);

        var users = await _userService.GetUsersByIdListAsync(answers.Select(s => s.UserId), cancellationToken);
        var usersDict = users.ToDictionary(u => u.Id);
        var answersDto = answers.Select(a => new FormAnswerDto(
            a.Id,
            a.UserId,
            usersDict[a.UserId].UserName,
            usersDict[a.UserId].Name,
            a.Created)).ToList();

        return PagedList<FormAnswerDto>.Create(answersDto, request.Page, request.PageSize, totalCount);
    }
}
