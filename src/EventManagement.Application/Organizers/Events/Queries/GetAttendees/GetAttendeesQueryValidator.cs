using EventManagement.Application.Common.Pagination;
using FluentValidation;

namespace EventManagement.Application.Organizers.Events.Queries.GetAttendees;

public sealed class GetAttendeesQueryValidator : PagedRequestValidator<GetAttendeesQuery>
{
    public GetAttendeesQueryValidator() : base()
    {
        RuleFor(x => x.EventId)
            .NotEmpty().WithMessage("EventId is required.");

        RuleFor(x => x.Status)
            .IsInEnum().When(x => x.Status.HasValue).WithMessage("Status must be one of the following: 'All', 'Approved', 'Pending', 'Rejected'.");
    }
}
