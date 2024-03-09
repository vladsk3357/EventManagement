using EventManagement.Application.Common.Exceptions;
using EventManagement.Application.Common.Interfaces;
using EventManagement.Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace EventManagement.Application.Communities.Queries.GetCommunityDetails;

public sealed record GetCommunityDetailsQuery(int Id) : IRequest<CommunityDetailsDto>;

internal sealed class GetCommunityDetailsQueryHandler : IRequestHandler<GetCommunityDetailsQuery, CommunityDetailsDto>
{
    private readonly IApplicationDbContext _context;
    private readonly ICurrentUserAccessor _currentUserAccessor;

    public GetCommunityDetailsQueryHandler(
        IApplicationDbContext context,
        ICurrentUserAccessor currentUserAccessor)
    {
        _context = context;
        _currentUserAccessor = currentUserAccessor;
    }

    public async Task<CommunityDetailsDto> Handle(GetCommunityDetailsQuery request, CancellationToken cancellationToken)
    {
        var userId = _currentUserAccessor.UserId;

        var community = await _context.Communities.FindAsync(new object?[] { request.Id }, cancellationToken)
            ?? throw new NotFoundException(nameof(Community), request.Id);

        var subscribersCount = await _context.Subscriptions
            .CountAsync(cs => cs.CommunityId == community.Id, cancellationToken);

        return GetCommunityDetailsQueryMapper.ToDto(community, subscribersCount);
    }
}
