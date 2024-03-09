using EventManagement.Application.Common.Exceptions;
using EventManagement.Application.Common.Interfaces;
using EventManagement.Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace EventManagement.Application.Communities.Commands.SubscribeCommunity;

public sealed record SubscribeCommunityCommand(int CommunityId) : IRequest;

internal class SubscribeCommunityCommandHandler : IRequestHandler<SubscribeCommunityCommand>
{
    private readonly IApplicationDbContext _context;
    private readonly ICurrentUserAccessor _currentUserAccessor;

    public SubscribeCommunityCommandHandler(IApplicationDbContext context, ICurrentUserAccessor currentUserAccessor)
    {
        _context = context;
        _currentUserAccessor = currentUserAccessor;
    }

    public async Task Handle(SubscribeCommunityCommand request, CancellationToken cancellationToken)
    {
        var userId = _currentUserAccessor.UserId!;

        var community = await _context.Communities
            .FirstOrDefaultAsync(c => c.Id == request.CommunityId, cancellationToken) 
            ?? throw new NotFoundException(nameof(Community), request.CommunityId);

        var userCommunity = await _context.Subscriptions
            .FirstOrDefaultAsync(s => s.UserId == userId && s.CommunityId == request.CommunityId, cancellationToken);

        if (userCommunity is not null)
            throw new ValidationException("Користувач вже підписаний на спільноту");

        await _context.Subscriptions.AddAsync(new Subscription
        {
            CommunityId = request.CommunityId,
            UserId = userId
        }, cancellationToken);

        await _context.SaveChangesAsync(cancellationToken);
    }
}
