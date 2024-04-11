using EventManagement.Application.Common.Interfaces;
using EventManagement.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace EventManagement.Application.Events.Commands;

internal static class IApplicationDbContextExtensions
{
    public static async Task<Attendee?> GetAttendeeAsync(
        this IApplicationDbContext context,
        int eventId,
        string userId,
        CancellationToken cancellationToken = default)
    {
        ArgumentException.ThrowIfNullOrEmpty(userId, nameof(userId));

        return await context.Attendees
                .FirstOrDefaultAsync(er => er.EventId == eventId && er.UserId == userId, cancellationToken);
    }
}
