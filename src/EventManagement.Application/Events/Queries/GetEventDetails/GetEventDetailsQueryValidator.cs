using FluentValidation;

namespace EventManagement.Application.Events.Queries.GetEventDetails;

public sealed class GetEventDetailsQueryValidator : AbstractValidator<GetEventDetailsQuery>
{
    public GetEventDetailsQueryValidator()
    {
        RuleFor(x => x.Id)
            .NotEmpty()
            .WithMessage("Id is required.");
    }
}
