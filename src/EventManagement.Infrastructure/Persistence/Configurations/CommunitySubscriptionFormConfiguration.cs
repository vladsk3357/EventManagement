using EventManagement.Domain.Entities.Form;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace EventManagement.Infrastructure.Persistence.Configurations;

internal sealed class CommunitySubscriptionFormConfiguration : IEntityTypeConfiguration<CommunitySubscriptionForm>
{
    public void Configure(EntityTypeBuilder<CommunitySubscriptionForm> builder)
    {
        builder.HasKey(e => e.Id);

        builder.HasOne(e => e.Community)
            .WithOne(c => c.SubscriptionForm);

        builder.HasOne(e => e.Form)
            .WithOne(f => f.CommunitySubscriptionForm);

        builder.HasIndex(e => e.FormId)
            .IsUnique();

        builder.HasIndex(e => e.CommunityId)
            .IsUnique();
    }
}
