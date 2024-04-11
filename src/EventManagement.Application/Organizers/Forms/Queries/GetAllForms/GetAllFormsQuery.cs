using EventManagement.Application.Common.Exceptions;
using EventManagement.Application.Common.Interfaces;
using EventManagement.Application.Common.Pagination;
using EventManagement.Domain.Entities;
using EventManagement.Domain.Entities.Form;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace EventManagement.Application.Organizers.Forms.Queries.GetAllForms;

public sealed record GetAllFormsQuery(int CommunityId): IRequest<NonPagedList<FormDto>>;

public sealed record FormDto(
    int Id,
    string Name,
    FormType Type);

internal sealed class GetAllFormsQueryHandler : IRequestHandler<GetAllFormsQuery, NonPagedList<FormDto>>
{
    private readonly IApplicationDbContext _context;
    private readonly ICurrentUserAccessor _currentUserAccessor;

    public GetAllFormsQueryHandler(
        IApplicationDbContext context, 
        ICurrentUserAccessor currentUserAccessor)
    {
        _context = context;
        _currentUserAccessor = currentUserAccessor;
    }

    public async Task<NonPagedList<FormDto>> Handle(GetAllFormsQuery request, CancellationToken cancellationToken)
    {
        var community = await _context.Communities
            .Include(c => c.Events)
            .FirstOrDefaultAsync(
            c => c.Id == request.CommunityId 
            && c.OrganizerId == _currentUserAccessor.UserId, 
            cancellationToken) ?? throw new NotFoundException(nameof(Community), request.CommunityId);

        var eventsIds = community.Events.Select(e => e.Id).ToList();

        var forms = await _context.Forms
            .Include(f => f.CommunityForm)
            .Include(f => f.CommunitySubscriptionForm)
            .Include(f => f.EventAttendanceForm)
            .Where(f => f.CommunityForm != null && f.CommunityForm.CommunityId == request.CommunityId 
                || f.CommunitySubscriptionForm != null && f.CommunitySubscriptionForm.CommunityId == request.CommunityId
                || f.EventAttendanceForm != null && eventsIds.Contains(f.EventAttendanceForm.EventId))
            .ToListAsync(cancellationToken);

        return new NonPagedList<FormDto>(forms.Select(f => f.ToDto(community.Name)).ToList());
    }
}