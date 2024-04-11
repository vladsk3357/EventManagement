using System.Text.Json;
using EventManagement.Domain.Entities.Form.Answer;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace EventManagement.Infrastructure.Persistence.Configurations;

internal sealed class FormAnswerConfiguration : IEntityTypeConfiguration<FormAnswer>
{
    public void Configure(EntityTypeBuilder<FormAnswer> builder)
    {
        builder.HasKey(e => e.Id);

        builder.HasIndex(e => e.UserId);

        builder.HasIndex(e => e.FormId);

        builder.HasOne(e => e.Form)
            .WithMany(e => e.Answers);

        builder.Property(e => e.UserId)
            .HasMaxLength(450);

        builder.Property(e => e.FieldAnswers)
            .HasConversion(
                v => JsonSerializer.Serialize(v, new JsonSerializerOptions()),
                v => JsonSerializer.Deserialize<List<FormFieldAnswer>>(v, new JsonSerializerOptions()));
    }
}
