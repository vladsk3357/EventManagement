using EventManagement.Domain.Entities.Community;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace EventManagement.Infrastructure.Persistence.Configurations;

internal sealed class SocialMediaConfiguration : IEntityTypeConfiguration<SocialMedia>
{
    public void Configure(EntityTypeBuilder<SocialMedia> builder)
    {
        builder.HasKey(e => e.Id);

        builder.HasOne(e => e.Community)
            .WithOne(e => e.SocialMedia)
            .HasForeignKey<SocialMedia>(e => e.CommunityId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.Property(e => e.WebsiteUrl)
            .HasMaxLength(200);

        builder.Property(e => e.FacebookUrl)
            .HasMaxLength(200);

        builder.Property(e => e.TwitterUrl)
            .HasMaxLength(200);

        builder.Property(e => e.LinkedInUrl)
            .HasMaxLength(200);

        builder.Property(e => e.InstagramUrl)
            .HasMaxLength(200);

        builder.Property(e => e.YouTubeUrl)
            .HasMaxLength(200);

        builder.Property(e => e.DiscordUrl)
            .HasMaxLength(200);

        builder.Property(e => e.SlackUrl)
            .HasMaxLength(200);

        builder.Property(e => e.TwitchUrl)
            .HasMaxLength(200);

        builder.Property(e => e.MediumUrl)
            .HasMaxLength(200);

        builder.Property(e => e.TikTokUrl)
            .HasMaxLength(200);

        builder.Property(e => e.TelegramUrl)
            .HasMaxLength(200);
    }
}
