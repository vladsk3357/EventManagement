using EventManagement.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace EventManagement.Infrastructure.Persistence.Configurations;

internal sealed class SessionConfiguration : IEntityTypeConfiguration<Session>
{
    public void Configure(EntityTypeBuilder<Session> builder)
    {
        builder.HasKey(e => e.Id);

        builder.HasIndex(e => e.EventId);

        builder.HasMany(e => e.Speakers)
            .WithMany(s => s.Sessions)
            .UsingEntity(
                l => l.HasOne(typeof(Speaker)).WithMany().OnDelete(DeleteBehavior.Restrict),
                r => r.HasOne(typeof(Session)).WithMany().OnDelete(DeleteBehavior.Cascade));

        builder.Property(e => e.Title)
            .HasMaxLength(200);

        builder.Property(e => e.Description)
            .HasMaxLength(1000);

        builder.Property(e => e.CreatedBy)
            .HasMaxLength(450);

        builder.Property(e => e.LastModifiedBy)
            .HasMaxLength(450);
    }
}
