using EventManagement.Application.Common.Interfaces;
using EventManagement.Application.Organizers.Events.Common;
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

        RuleFor(x => x.Attendance).IsValid();

        RuleFor(x => x.Venue).IsValid();

        RuleFor(x => x.CommunityId).NotEmpty();
    }
}
