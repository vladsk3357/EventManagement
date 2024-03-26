using FluentValidation;

namespace EventManagement.Application.Common.Pagination;

public abstract class PagedRequestValidator<T> : AbstractValidator<T> where T : PagedRequest
{
    public PagedRequestValidator()
    {
        RuleFor(x => x.Page).GreaterThanOrEqualTo(0);

        RuleFor(x => x.PageSize).GreaterThanOrEqualTo(1);
    }
}
