﻿using EventManagement.Application.Common.Exceptions;
using EventManagement.Application.Common.Interfaces;
using EventManagement.Domain.Entities;
using EventManagement.Domain.Entities.CommunityEvent;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace EventManagement.Application.Events.Queries.GetEventDetails;

public sealed record GetEventDetailsQuery(int Id) : IRequest<GetEventDetailsDto>;

internal sealed class GetEventDetailsQueryHandler : IRequestHandler<GetEventDetailsQuery, GetEventDetailsDto>
{
    private readonly IApplicationDbContext _context;
    private readonly ICurrentUserAccessor _currentUserAccessor;
    private readonly IDateTime _dateTime;

    public GetEventDetailsQueryHandler(IApplicationDbContext context, IDateTime dateTime, ICurrentUserAccessor currentUserAccessor)
    {
        _context = context;
        _dateTime = dateTime;
        _currentUserAccessor = currentUserAccessor;
    }

    public async Task<GetEventDetailsDto> Handle(GetEventDetailsQuery request, CancellationToken cancellationToken)
    {
        var @event = await _context.Events.Include(e => e.Community)
            .Include(e => e.Attendees)
            .FirstOrDefaultAsync(e => e.Id == request.Id, cancellationToken) 
            ?? throw new NotFoundException(nameof(Event), request.Id);

        var attendeesCount = @event.Attendees.Count(e => e.Status == AttendeeStatus.Confirmed);
        var isAttendable = @event.StartDate > _dateTime.Now 
            || (@event.Attendance.Limited && attendeesCount >= @event.Attendance.Limit);

        var isAttending = @event.Attendees
            .Any(e => e.UserId == _currentUserAccessor.UserId && e.Status == AttendeeStatus.Confirmed);

        var isOrganizer = @event.OrganizerId == _currentUserAccessor.UserId;

        return @event.ToDto(attendeesCount, isAttendable, isAttending, isOrganizer);
    }
}