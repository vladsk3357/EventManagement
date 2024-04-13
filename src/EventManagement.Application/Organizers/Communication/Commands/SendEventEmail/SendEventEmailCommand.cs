using EventManagement.Application.Common.Exceptions;
using EventManagement.Application.Common.Interfaces;
using EventManagement.Application.Common.Security;
using EventManagement.Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace EventManagement.Application.Organizers.Communication.Commands.SendEventEmail;

[Authorize]
public sealed record SendEventEmailCommand(
    int EventId, 
    string Subject, 
    string Body, 
    bool ToPending,
    bool ToConfirmed) : IRequest;

internal sealed record SendEventEmailCommandHandler : IRequestHandler<SendEventEmailCommand>
{
    private readonly IMailService _mailService;
    private readonly IApplicationDbContext _context;
    private readonly ICurrentUserAccessor _currentUserAccessor;
    private readonly IUserService _userService;

    public SendEventEmailCommandHandler(
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

    public async Task Handle(SendEventEmailCommand request, CancellationToken cancellationToken)
    {
        var @event = await _context.Events.Include(c => c.Attendees)
            .FirstOrDefaultAsync(c => c.Id == request.EventId
                && c.OrganizerId == _currentUserAccessor.UserId, cancellationToken)
            ?? throw new InvalidRequestException(nameof(request.EventId), "Event with this Id doesn't exist");

        var usersIds = @event.Attendees
            .Where(a => (request.ToPending && a.Status == AttendeeStatus.Pending) || (request.ToConfirmed && a.Status == AttendeeStatus.Confirmed))
            .Select(s => s.UserId)
            .ToList();

        var users = await _userService.GetUsersByIdListAsync(usersIds, cancellationToken);
        var emails = users.Select(u => u.Email).ToList();

        await _mailService.SendEmailAsync(
            emails,
            FormatEmailSubject(request.Subject, @event.Name),
            request.Body,
            cancellationToken);
    }

    private static string FormatEmailSubject(string subject, string eventName)
    {
        return $"{eventName}: \"{subject}\"";
    }
}

