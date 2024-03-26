using FluentValidation;

namespace EventManagement.Application.Events.Commands.AttendEvent;

public sealed class AttendEventCommandValidator : AbstractValidator<AttendEventCommand>
{
    public AttendEventCommandValidator()
    {
        RuleFor(x => x.EventId).NotEmpty();
    }
}
