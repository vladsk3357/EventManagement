using EventManagement.Application.Common.Exceptions;
using EventManagement.Application.Common.Interfaces;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;

namespace EventManagement.Application.Organizers.Invitations.Commands;

[Authorize]
public sealed record InviteToCommunityCommand(int CommunityId, IEnumerable<string> Emails): IRequest;

internal sealed class InviteToCommunityCommandHandler : IRequestHandler<InviteToCommunityCommand>
{
    private readonly IApplicationDbContext _context;
    private readonly ICurrentUserAccessor _currentUserAccessor;
    private readonly IUserService _userService;
    private readonly IMailService _mailService;

    public InviteToCommunityCommandHandler(
        IApplicationDbContext context,
        ICurrentUserAccessor currentUserAccessor,
        IUserService userService,
        IMailService mailService)
    {
        _context = context;
        _currentUserAccessor = currentUserAccessor;
        _userService = userService;
        _mailService = mailService;
    }

    public async Task Handle(InviteToCommunityCommand request, CancellationToken cancellationToken)
    {
        var community = await _context.Communities.Include(c => c.Subscriptions)
            .FirstOrDefaultAsync(c => c.Id == request.CommunityId
                && c.OrganizerId == _currentUserAccessor.UserId, cancellationToken)
                ?? throw new InvalidRequestException(nameof(request.CommunityId), "Community with this Id doesn't exist");

        var communitySubscribers = community.Subscriptions.Select(s => s.UserId).ToList();
        var users = await _userService.GetUsersByEmailListAsync(request.Emails, cancellationToken);

        var to = users.Where(u => !communitySubscribers.Contains(u.Id))
            .Select(u => u.Email)
            .ToList();

        await Task.WhenAll(to.Select(email => _mailService.SendInvitationToCommunityMailAsync(email, community, cancellationToken)));
    }
}
