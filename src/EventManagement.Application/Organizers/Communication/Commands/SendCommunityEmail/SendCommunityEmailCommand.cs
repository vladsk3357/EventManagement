using EventManagement.Application.Common.Exceptions;
using EventManagement.Application.Common.Interfaces;
using EventManagement.Application.Common.Security;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace EventManagement.Application.Organizers.Communication.Commands.SendCommunityEmail;

[Authorize]
public sealed record SendCommunityEmailCommand(int CommunityId, string Subject, string Body) : IRequest;

internal sealed class SendCommunityEmailCommandHandler : IRequestHandler<SendCommunityEmailCommand>
{
    private readonly IMailService _mailService;
    private readonly IApplicationDbContext _context;
    private readonly ICurrentUserAccessor _currentUserAccessor;
    private readonly IUserService _userService;

    public SendCommunityEmailCommandHandler(
        IMailService mailService,
        IApplicationDbContext context,
        ICurrentUserAccessor currentUserAccessor,
        IUserService userService)
    {
        _mailService = mailService;
        _context = context;
        _currentUserAccessor = currentUserAccessor;
        _userService = userService;
    }

    public async Task Handle(SendCommunityEmailCommand request, CancellationToken cancellationToken)
    {
        var community = await _context.Communities.Include(c => c.Subscriptions)
            .FirstOrDefaultAsync(c => c.Id == request.CommunityId
                && c.OrganizerId == _currentUserAccessor.UserId, cancellationToken)
            ?? throw new InvalidRequestException(nameof(request.CommunityId), "Community with this Id doesn't exist");

        var users = await _userService.GetUsersByIdListAsync(community.Subscriptions.Select(s => s.UserId), cancellationToken);
        var emails = users.Select(u => u.Email).ToList();

        await Task.WhenAll(emails.Select(email => _mailService.SendCommunicationEmailAsync(email, request.Subject, request.Body, community, cancellationToken)));
    }
}
