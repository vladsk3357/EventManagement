using EventManagement.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace EventManagement.Infrastructure.Persistence.Configurations;

internal sealed class SpeakerConfiguration : IEntityTypeConfiguration<Speaker>
{
    public void Configure(EntityTypeBuilder<Speaker> builder)
    {
        builder.HasKey(e => e.Id);

        builder.HasIndex(e => e.EventId);

        builder.Property(e => e.Name)
            .HasMaxLength(200);

        builder.Property(e => e.Title)
            .HasMaxLength(200);

        builder.Property(e => e.Company)
            .HasMaxLength(200);

        builder.Property(e => e.Bio)
            .HasMaxLength(1000);

        builder.Property(e => e.CreatedBy)
            .HasMaxLength(450);

        builder.Property(e => e.LastModifiedBy)
            .HasMaxLength(450);
    }
}
