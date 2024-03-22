using EventManagement.Application.Common.Exceptions;
using EventManagement.Application.Common.Interfaces;
using EventManagement.Application.Common.Security;
using EventManagement.Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace EventManagement.Application.Organizers.Events.Commands.CreateEvent;

[Authorize]
public sealed record CreateEventCommand(
    string Name,
    string Description,
    DateTime StartDate,
    DateTime EndDate,
    CreateEventAttendanceDto Attendance,
    CreateEventLocationDto Location,
    int CommunityId) : IRequest<CreateEventResultDto>;

internal sealed class CreateEventCommandHandler 
    : IRequestHandler<CreateEventCommand, CreateEventResultDto>
{
    private readonly IApplicationDbContext _context;
    private readonly ICurrentUserAccessor _currentUserAccessor;

    public CreateEventCommandHandler(
        IApplicationDbContext dbContext, 
        ICurrentUserAccessor currentUserAccessor)
    {
        _context = dbContext;
        _currentUserAccessor = currentUserAccessor;
    }

    public async Task<CreateEventResultDto> Handle(CreateEventCommand request, CancellationToken cancellationToken)
    {
        var userId = _currentUserAccessor.UserId;
        var community = await _context.Communities
            .FirstOrDefaultAsync(c => c.Id == request.CommunityId && c.OrganizerId == userId, cancellationToken) 
            ?? throw new ValidationException();

        var entity = request.ToEntity();
        entity.OrganizerId = userId;

        await _context.Events.AddAsync(entity, cancellationToken);
        await _context.SaveChangesAsync(cancellationToken);

        await _context.Attendees.AddAsync(new Attendee
        {
            EventId = entity.Id,
            UserId = userId,
            Status = AttendeeStatus.Confirmed,
        }, cancellationToken);
        await _context.SaveChangesAsync(cancellationToken);

        return new CreateEventResultDto(entity.Id);
    }
}

