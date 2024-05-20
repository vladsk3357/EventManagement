using EventManagement.Application.Common.Exceptions;
using EventManagement.Application.Common.Interfaces;
using EventManagement.Domain.Entities;
using EventManagement.Domain.Entities.CommunityEvent;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace EventManagement.Application.Events.Queries.GetEventDetails;

public sealed record GetEventDetailsQuery(int Id) : IRequest<GetEventDetailsDto>;

internal sealed class GetEventDetailsQueryHandler(
    IApplicationDbContext context,
    IDateTime dateTime,
    ICurrentUserAccessor currentUserAccessor,
    IFileStorageService fileStorageService) : IRequestHandler<GetEventDetailsQuery, GetEventDetailsDto>
{
    private readonly IApplicationDbContext _context = context;
    private readonly ICurrentUserAccessor _currentUserAccessor = currentUserAccessor;
    private readonly IDateTime _dateTime = dateTime;
    private readonly IFileStorageService _fileStorageService = fileStorageService;

    public async Task<GetEventDetailsDto> Handle(GetEventDetailsQuery request, CancellationToken cancellationToken)
    {
        var @event = await _context.Events.Include(e => e.Community)
            .Include(e => e.Attendees)
            .Include(e => e.Speakers)
            .Include(e => e.Sessions)
            .ThenInclude(s => s.Speakers)
            .Include(e => e.Images)
            .FirstOrDefaultAsync(e => e.Id == request.Id, cancellationToken)
            ?? throw new NotFoundException(nameof(Event), request.Id);

        var attendeesCount = @event.Attendees.Count(e => e.Status == AttendeeStatus.Confirmed);
        var isOrganizer = @event.OrganizerId == _currentUserAccessor.UserId;
        var isAttendable = @event.StartDate > _dateTime.Now && !isOrganizer
            && (!@event.Attendance.Limited || attendeesCount < @event.Attendance.Limit);

        var currentAttendee = @event.Attendees
            .FirstOrDefault(e => e.UserId == _currentUserAccessor.UserId);

        var tasks = @event.Images.Select(i => _fileStorageService.GetFileUrlAsync(i.FileName, cancellationToken)).ToList();
        var imagesUrls = await Task.WhenAll(tasks);

        return @event.ToDto(
            attendeesCount, 
            isAttendable, 
            currentAttendee?.Status, 
            isOrganizer, 
            imagesUrls.Select(i => i.ToString()).ToList());
    }
}
