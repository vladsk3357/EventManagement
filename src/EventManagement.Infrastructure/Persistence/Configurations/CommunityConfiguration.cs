using EventManagement.Domain.Entities.Community;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace EventManagement.Infrastructure.Persistence.Configurations;

internal sealed class CommunityConfiguration : IEntityTypeConfiguration<Community>
{
    public void Configure(EntityTypeBuilder<Community> builder)
    {
        builder.HasKey(e => e.Id);

        builder.HasIndex(e => e.OrganizerId);

        builder.Property(e => e.Name)
            .HasMaxLength(200);

        builder.Property(e => e.OrganizerId)
            .HasMaxLength(450);

        builder.Property(e => e.Domain)
            .HasMaxLength(200);

        builder.Property(e => e.Location)
            .HasMaxLength(200);

        builder.Property(e => e.CommunityImage)
            .HasMaxLength(200);

        builder.Property(e => e.ShortDescription)
            .HasMaxLength(400);

        builder.Property(e => e.CreatedBy)
            .HasMaxLength(450);

        builder.Property(e => e.LastModifiedBy)
            .HasMaxLength(450);
    }
}
