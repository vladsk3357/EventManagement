using EventManagement.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace EventManagement.Infrastructure.Persistence.Configurations;

internal sealed class SubscriptionConfiguration : IEntityTypeConfiguration<Subscription>
{
    public void Configure(EntityTypeBuilder<Subscription> builder)
    {
        builder.HasKey(e => e.Id);

        builder.HasIndex(e => e.CommunityId);

        builder.HasIndex(e => e.UserId);

        builder.Property(e => e.UserId)
            .HasMaxLength(450);

        builder.Property(e => e.CreatedBy)
           .HasMaxLength(450);

        builder.Property(e => e.LastModifiedBy)
            .HasMaxLength(450);
    }
}
