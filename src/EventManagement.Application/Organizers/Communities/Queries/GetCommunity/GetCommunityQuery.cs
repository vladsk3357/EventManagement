using EventManagement.Application.Common.Exceptions;
using EventManagement.Application.Common.Interfaces;
using EventManagement.Application.Common.Security;
using EventManagement.Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace EventManagement.Application.Organizers.Communities.Queries.GetCommunity;

[Authorize]
public sealed record GetCommunityQuery(int Id) : IRequest<GetCommunityDto>;

internal sealed class GetCommunityQueryHandler(
    ICurrentUserAccessor currentUserAccessor,
    IApplicationDbContext context,
    IFileStorageService fileStorageService) : IRequestHandler<GetCommunityQuery, GetCommunityDto>
{
    private readonly ICurrentUserAccessor _currentUserAccessor = currentUserAccessor;
    private readonly IApplicationDbContext _context = context;
    private readonly IFileStorageService _fileStorageService = fileStorageService;

    public async Task<GetCommunityDto> Handle(GetCommunityQuery request, CancellationToken cancellationToken)
    {
        var community = await _context.Communities
            .Where(c => c.OrganizerId == _currentUserAccessor.UserId && c.Id == request.Id)
            .FirstOrDefaultAsync(cancellationToken: cancellationToken)
            ?? throw new NotFoundException(nameof(Community), request.Id);

        var communityImage = community.CommunityImage is not null
            ? await _fileStorageService.GetFileUrlAsync(community.CommunityImage, cancellationToken)
            : null;

        return community.ToDto(communityImage?.ToString());
    }
}
