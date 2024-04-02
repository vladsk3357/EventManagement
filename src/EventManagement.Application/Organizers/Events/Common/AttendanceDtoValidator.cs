using FluentValidation;

namespace EventManagement.Application.Organizers.Events.Common;

internal sealed class AttendanceDtoValidator : AbstractValidator<AttendanceDto>
{
    public AttendanceDtoValidator()
    {
        RuleFor(x => x.Limit).GreaterThan(0).When(x => x.Limit is not null);

        RuleFor(x => x.ShouldBeApproved);
    }
}
