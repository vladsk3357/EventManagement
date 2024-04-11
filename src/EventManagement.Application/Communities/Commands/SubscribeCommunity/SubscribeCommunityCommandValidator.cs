using FluentValidation;

namespace EventManagement.Application.Communities.Commands.SubscribeCommunity;

public class SubscribeCommunityCommandValidator : AbstractValidator<SubscribeCommunityCommand>
{
    public SubscribeCommunityCommandValidator()
    {
        RuleFor(x => x.CommunityId)
            .NotEmpty()
            .WithMessage("CommunityId is required.");
    }
}
