using EventManagement.Application.Common.Exceptions;
using EventManagement.Application.Common.Interfaces;
using EventManagement.Application.Common.Security;
using EventManagement.Domain.Entities.Community;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace EventManagement.Application.Communities.Queries.GetCommunityDetails;

[Authorize]
public sealed record GetCommunityDetailsQuery(int Id) : IRequest<CommunityDetailsDto>;

internal sealed class GetCommunityDetailsQueryHandler(
    IApplicationDbContext context,
    ICurrentUserAccessor currentUserAccessor,
    IFileStorageService fileStorageService) : IRequestHandler<GetCommunityDetailsQuery, CommunityDetailsDto>
{
    private readonly IApplicationDbContext _context = context;
    private readonly ICurrentUserAccessor _currentUserAccessor = currentUserAccessor;
    private readonly IFileStorageService _fileStorageService = fileStorageService;

    public async Task<CommunityDetailsDto> Handle(GetCommunityDetailsQuery request, CancellationToken cancellationToken)
    {
        var userId = _currentUserAccessor.UserId;

        var community = await _context.Communities
            .Include(c => c.SubscriptionForm)
            .ThenInclude(f => f.Form)
            .Include(f => f.SocialMedia)
            .FirstOrDefaultAsync(c => c.Id == request.Id, cancellationToken)
            ?? throw new NotFoundException(nameof(Community), request.Id);

        var subscribersCount = await _context.Subscriptions
            .CountAsync(cs => cs.CommunityId == community.Id, cancellationToken);

        var isSubscribed = await _context.Subscriptions
            .AnyAsync(cs => cs.CommunityId == community.Id && cs.UserId == userId, cancellationToken);

        var requiresFormAnswer = community.SubscriptionForm.Form.Fields.Count != 0;

        var formId = community.SubscriptionForm.FormId;
        var communityImage = community.CommunityImage is not null
            ? await _fileStorageService.GetFileUrlAsync(community.CommunityImage, cancellationToken)
            : null;

        return GetCommunityDetailsQueryMapper.ToDto(
            community, 
            subscribersCount, 
            isSubscribed, 
            community.OrganizerId == userId, 
            requiresFormAnswer, 
            formId,
            communityImage?.ToString());
    }
}
