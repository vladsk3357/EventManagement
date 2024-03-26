using FluentValidation;

namespace EventManagement.Application.Communities.Queries.GetCommunityDetails;

public class GetCommunityDetailsQueryValidator : AbstractValidator<GetCommunityDetailsQuery>
{
    public GetCommunityDetailsQueryValidator()
    {
        RuleFor(x => x.Id)
            .NotEmpty()
            .WithMessage("Id is required.");
    }
}
