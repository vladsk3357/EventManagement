﻿using EventManagement.Application.Common.Exceptions;
using EventManagement.Application.Common.Interfaces;
using EventManagement.Domain.Entities.Community;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace EventManagement.Application.Communities.Commands.UnsubscribeCommunity;

public sealed record UnsubscribeCommunityCommand(int CommunityId) : IRequest;

internal sealed class UnsubscribeCommunityCommandHandler(
    IApplicationDbContext context,
    ICurrentUserAccessor currentUserAccessor) 
    : IRequestHandler<UnsubscribeCommunityCommand>
{
    private readonly IApplicationDbContext _context = context;
    private readonly ICurrentUserAccessor _currentUserAccessor = currentUserAccessor;

    public async Task Handle(UnsubscribeCommunityCommand request, CancellationToken cancellationToken)
    {
        var userId = _currentUserAccessor.UserId;

        var community = await _context.Communities
            .FirstOrDefaultAsync(c => c.Id == request.CommunityId, cancellationToken)
            ?? throw new NotFoundException(nameof(Community), request.CommunityId);

        var userCommunity = await _context.Subscriptions
            .FirstOrDefaultAsync(s => s.UserId == userId && s.CommunityId == request.CommunityId, cancellationToken)
            ?? throw new ValidationException("Користувач не підписаний на спільноту");

        if (community.OrganizerId == userId)
            throw new ValidationException("Організатор не може відписатися від своєї спільноти");

        _context.Subscriptions.Remove(userCommunity);

        await _context.SaveChangesAsync(cancellationToken);
    }
}
