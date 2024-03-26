using EventManagement.Infrastructure.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace EventManagement.Infrastructure.Persistence.Configurations;

internal sealed class ApplicationUserConfiguration : IEntityTypeConfiguration<ApplicationUser>
{
    public void Configure(EntityTypeBuilder<ApplicationUser> builder)
    {
        builder.Ignore(e => e.DomainEvents);

        builder.Property(e => e.Name)
            .HasMaxLength(200);

        builder.Property(e => e.Location)
            .HasMaxLength(200);

        builder.Property(e => e.Language)
            .HasMaxLength(200);

        builder.Property(e => e.Information)
            .HasMaxLength(1000);
    }
}
