using EventManagement.Application.Common.Pagination;
using FluentValidation;

namespace EventManagement.Application.Communities.Queries.GetSubscribers;

public sealed class GetSubscribersValidator : PagedRequestValidator<GetSubscribersQuery>
{
    public GetSubscribersValidator(): base()
    {
        RuleFor(x => x.CommunityId).NotEmpty();
    }
}
