using EventManagement.Application.Common.Exceptions;
using EventManagement.Application.Common.Interfaces;
using EventManagement.Application.Common.Security;
using EventManagement.Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace EventManagement.Application.Organizers.Communities.Queries.GetCommunity;

[Authorize]
public sealed record GetCommunityQuery(int Id) : IRequest<GetCommunityDto>;

internal sealed class GetCommunityQueryHandler
    : IRequestHandler<GetCommunityQuery, GetCommunityDto>
{
    private readonly ICurrentUserAccessor _currentUserAccessor;
    private readonly IApplicationDbContext _context;

    public GetCommunityQueryHandler(
        ICurrentUserAccessor currentUserAccessor,
        IApplicationDbContext context)
    {
        _currentUserAccessor = currentUserAccessor;
        _context = context;
    }

    public async Task<GetCommunityDto> Handle(GetCommunityQuery request, CancellationToken cancellationToken)
    {
        var community = await _context.Communities
            .Where(c => c.OrganizerId == _currentUserAccessor.UserId && c.Id == request.Id)
            .FirstOrDefaultAsync(cancellationToken: cancellationToken)
            ?? throw new NotFoundException(nameof(Community), request.Id);

        return community.ToDto();
    }
}
