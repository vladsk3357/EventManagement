using FluentValidation;

namespace EventManagement.Application.Communities.Commands.UnsubscribeCommunity;

public sealed class UnsubscribeCommunityCommandValidator 
    : AbstractValidator<UnsubscribeCommunityCommand>
{
    public UnsubscribeCommunityCommandValidator()
    {
        RuleFor(x => x.CommunityId)
            .NotEmpty()
            .WithMessage("CommunityId is required.");
    }
}
