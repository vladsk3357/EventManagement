using FluentValidation;

namespace EventManagement.Application.Organizers.Speakers.Queries.GetSpeakers;

internal sealed class GetSpeakersQueryValidator : AbstractValidator<GetSpeakersQuery>
{
    public GetSpeakersQueryValidator()
    {
        RuleFor(x => x.EventId)
            .NotEmpty().WithMessage("EventId is required.");
    }
}
