using FluentValidation;

namespace EventManagement.Application.Events.Commands.CancelEventAttendance;

public class CancelEventAttendanceCommandValidator : AbstractValidator<CancelEventAttendanceCommand>
{
    public CancelEventAttendanceCommandValidator()
    {
        RuleFor(x => x.EventId).NotEmpty();
    }
}
