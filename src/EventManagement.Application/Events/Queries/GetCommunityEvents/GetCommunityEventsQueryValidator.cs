using FluentValidation;

namespace EventManagement.Application.Events.Queries.GetCommunityEvents;

public sealed class GetCommunityEventsQueryValidator : AbstractValidator<GetCommunityEventsQuery>
{
    public GetCommunityEventsQueryValidator()
    {
        RuleFor(x => x.CommunityId)
            .NotEmpty()
            .WithMessage("CommunityId is required.");
    }
}
