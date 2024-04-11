using System.Reflection;
using EventManagement.Application;
using EventManagement.Application.Common.Interfaces;
using EventManagement.Application.Common.Models.User;
using EventManagement.Domain.Common;
using EventManagement.Domain.Entities;
using EventManagement.Domain.Entities.CommunityEvent;
using EventManagement.Domain.Entities.Form;
using EventManagement.Domain.Entities.Form.Answer;
using EventManagement.Infrastructure.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace EventManagement.Infrastructure;

internal class ApplicationDbContext : IdentityDbContext<ApplicationUser>, IApplicationDbContext
{
    // dotnet ef migrations add "InitialMigration" --project src\EventManagement.Infrastructure --startup-project src\EventManagement.WebApi --output-dir Persistence\Migrations
    // dotnet ef database update --project src\EventManagement.Infrastructure --startup-project src\EventManagement.WebApi 
    private readonly ICurrentUserService _currentUserService;
    private readonly IDateTime _dateTime;
    private readonly IDomainEventService _domainEventService;

    public ApplicationDbContext(
        DbContextOptions<ApplicationDbContext> options,
        ICurrentUserService currentUserService,
        IDateTime dateTime,
        IDomainEventService domainEventService) : base(options)
    {
        _currentUserService = currentUserService;
        _dateTime = dateTime;
        _domainEventService = domainEventService;
    }

    public DbSet<RefreshToken> RefreshTokens => Set<RefreshToken>();

    public DbSet<Community> Communities => Set<Community>();

    public DbSet<Event> Events => Set<Event>();

    public DbSet<Attendee> Attendees => Set<Attendee>();

    public DbSet<Speaker> Speakers => Set<Speaker>();

    public DbSet<Subscription> Subscriptions => Set<Subscription>();

    public DbSet<Session> Sessions => Set<Session>();

    public DbSet<Form> Forms => Set<Form>();

    public DbSet<CommunitySubscriptionForm> CommunitySubscriptionForms => Set<CommunitySubscriptionForm>();

    public DbSet<EventAttendanceForm> EventRegistrationForms => Set<EventAttendanceForm>();

    public DbSet<CommunityForm> CommunityForms => Set<CommunityForm>();

    public DbSet<FormAnswer> FormAnswers => Set<FormAnswer>();

    public override async Task<int> SaveChangesAsync(CancellationToken cancellationToken = new CancellationToken())
    {
        foreach (var entry in ChangeTracker.Entries<AuditableEntity>())
        {
            switch (entry.State)
            {
                case EntityState.Added:
                    entry.Entity.CreatedBy = _currentUserService.UserId;
                    entry.Entity.Created = _dateTime.Now;
                    break;

                case EntityState.Modified:
                    entry.Entity.LastModifiedBy = _currentUserService.UserId;
                    entry.Entity.LastModified = _dateTime.Now;
                    break;
            }
        }

        var events = ChangeTracker.Entries<IHasDomainEvent>()
                .Select(x => x.Entity.DomainEvents)
                .SelectMany(x => x)
                .Where(domainEvent => !domainEvent.IsPublished)
                .ToArray();

        var result = await base.SaveChangesAsync(cancellationToken);

        await DispatchEvents(events);
        
        return result;
    }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        builder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());

        base.OnModelCreating(builder);
    }

    private async Task DispatchEvents(DomainEvent[] events)
    {
        foreach (var @event in events)
        {
            @event.IsPublished = true;
            await _domainEventService.Publish(@event);
        }
    }
}
