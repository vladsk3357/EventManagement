using EventManagement.Application.Common.Pagination;
using FluentValidation;

namespace EventManagement.Application.Organizers.Subscribers.Queries.GetSubscribers;

public sealed class GetSubscribersQueryValidator : PagedRequestValidator<GetSubscribersQuery>
{
    public GetSubscribersQueryValidator() : base()
    {
        RuleFor(x => x.CommunityId).NotEmpty();
    }
}
