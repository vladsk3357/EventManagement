using EventManagement.Application.Common.Pagination;
using FluentValidation;

namespace EventManagement.Application.Events.Queries.GetAttendees;

public sealed class GetAttendeesValidator : PagedRequestValidator<GetAttendeesQuery>
{
    public GetAttendeesValidator() : base()
    {
        RuleFor(x => x.EventId).NotEmpty();
    }
}
