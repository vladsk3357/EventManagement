using EventManagement.Application.Common.Interfaces;
using FluentValidation;

namespace EventManagement.Application.Organizers.Events.Commands.EditEvent;

public sealed class EditEventCommandValidator : AbstractValidator<EditEventCommand>
{
    public EditEventCommandValidator(IDateTime dateTime)
    {
        RuleFor(x => x.Id).NotEmpty();

        RuleFor(x => x.Name).NotEmpty().MaximumLength(100);

        RuleFor(x => x.Description).NotEmpty().MaximumLength(500);

        RuleFor(x => x.StartDate).NotEmpty().GreaterThanOrEqualTo(dateTime.Now);

        RuleFor(x => x.EndDate).NotEmpty().GreaterThan(x => x.StartDate);

        RuleFor(x => x.Location).NotEmpty().MaximumLength(100);

        RuleFor(x => x.Attendance).NotEmpty().SetValidator(new AttendanceValidator());

        RuleFor(x => x.CommunityId).NotEmpty();
    }

    private sealed class AttendanceValidator : AbstractValidator<EditEventAttendanceDto>
    {
        public AttendanceValidator()
        {
            RuleFor(x => x.Limit).GreaterThan(0).When(x => x.Limit is not null);

            RuleFor(x => x.ShouldBeApproved);
        }
    }
}
