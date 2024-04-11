using EventManagement.Domain.Entities.Form;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace EventManagement.Infrastructure.Persistence.Configurations;

internal sealed class EventAttendanceFormConfiguration : IEntityTypeConfiguration<EventAttendanceForm>
{
    public void Configure(EntityTypeBuilder<EventAttendanceForm> builder)
    {
        builder.HasKey(e => e.Id);

        builder.HasOne(e => e.Event)
            .WithOne(c => c.AttendanceForm);

        builder.HasOne(e => e.Form)
            .WithOne(f => f.EventAttendanceForm);

        builder.HasIndex(e => e.FormId)
            .IsUnique();

        builder.HasIndex(e => e.EventId)
            .IsUnique();
    }
}
