using System.Text.Json;
using EventManagement.Domain.Entities.CommunityEvent;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace EventManagement.Infrastructure.Persistence.Configurations;

internal sealed class EventConfiguration : IEntityTypeConfiguration<Event>
{
    public void Configure(EntityTypeBuilder<Event> builder)
    {
        builder.HasKey(e => e.Id);

        builder.OwnsOne(e => e.Attendance);

        builder.HasIndex(e => e.OrganizerId);

        builder.HasIndex(e => e.CommunityId);

        builder.Property(e => e.Name)
            .HasMaxLength(200);

        var venueSerializerOptions = new JsonSerializerOptions();
        builder.Property(e => e.Venue)
            .HasConversion(
                v => JsonSerializer.Serialize(v, venueSerializerOptions),
                v => JsonSerializer.Deserialize<EventVenueBase>(v, venueSerializerOptions)!);

        builder.Property(e => e.Description)
            .HasMaxLength(2000);

        builder.Property(e => e.CreatedBy)
            .HasMaxLength(450);

        builder.Property(e => e.LastModifiedBy)
            .HasMaxLength(450);
    }
}
