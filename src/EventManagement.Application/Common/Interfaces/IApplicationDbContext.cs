using EventManagement.Application.Common.Models.User;
using EventManagement.Domain.Entities;
using EventManagement.Domain.Entities.CommunityEvent;
using EventManagement.Domain.Entities.Form;
using EventManagement.Domain.Entities.Form.Answer;
using Microsoft.EntityFrameworkCore;

namespace EventManagement.Application.Common.Interfaces;

public interface IApplicationDbContext
{
    DbSet<RefreshToken> RefreshTokens { get; }

    DbSet<Community> Communities { get; }

    DbSet<Event> Events { get; }

    DbSet<Attendee> Attendees { get; }

    DbSet<Speaker> Speakers { get; }

    DbSet<Subscription> Subscriptions { get; }

    DbSet<Session> Sessions { get; }

    DbSet<Form> Forms { get; }

    DbSet<CommunitySubscriptionForm> CommunitySubscriptionForms { get; }
    
    DbSet<EventAttendanceForm> EventRegistrationForms { get; }

    DbSet<CommunityForm> CommunityForms { get; }

    DbSet<FormAnswer> FormAnswers { get; }

    Task<int> SaveChangesAsync(CancellationToken cancellationToken = default);
}
