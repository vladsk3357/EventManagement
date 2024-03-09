using EventManagement.Application.Common.Models.User;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;

namespace EventManagement.Application.Common.Interfaces;

public interface IApplicationDbContext
{
    DbSet<RefreshToken> RefreshTokens { get; }

    DbSet<Domain.Entities.Community> Communities { get; }

    DbSet<Domain.Entities.Event> Events { get; }

    DbSet<Domain.Entities.Attendee> Attendees { get; }

    DbSet<Domain.Entities.Speaker> Speakers { get; }

    DbSet<Domain.Entities.Subscription> Subscriptions { get; }

    DbSet<Domain.Entities.Session> Sessions { get; }

    Task<int> SaveChangesAsync(CancellationToken cancellationToken = default);

    EntityEntry<TEntity> Entry<TEntity>(TEntity entity) where TEntity : class;
}
