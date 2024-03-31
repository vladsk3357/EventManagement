using EventManagement.Domain.Entities.Form;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace EventManagement.Infrastructure.Persistence.Configurations;

internal sealed class CommunityFormConfiguration : IEntityTypeConfiguration<CommunityForm>
{
    public void Configure(EntityTypeBuilder<CommunityForm> builder)
    {
        builder.HasKey(e => e.Id);

        builder.HasOne(e => e.Community)
            .WithMany(c => c.Forms);

        builder.HasOne(e => e.Form)
            .WithOne(f => f.CommunityForm);

        builder.HasIndex(e => e.FormId)
            .IsUnique();

        builder.HasIndex(e => e.CommunityId)
            .IsUnique();
    }
}
