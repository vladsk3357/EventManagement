using EventManagement.Application.Common.Pagination;
using FluentValidation;

namespace EventManagement.Application.Organizers.Events.Queries.GetEvents;

public sealed class GetEventsQueryValidator : PagedRequestValidator<GetEventsQuery>
{
    public GetEventsQueryValidator() : base()
    {
        RuleFor(x => x.CommunityId).NotEmpty();
        RuleFor(x => x.SearchTerm).NotEmpty().When(x => x.SearchTerm is not null);
        RuleFor(x => x.SortBy).NotEmpty().When(x => x.SortBy is not null);
        RuleFor(x => x.SortOrder).NotEmpty().When(x => x.SortOrder is not null);
    }
}
