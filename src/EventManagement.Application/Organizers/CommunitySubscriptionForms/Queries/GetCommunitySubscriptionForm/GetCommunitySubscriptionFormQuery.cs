using EventManagement.Application.Common.Exceptions;
using EventManagement.Application.Common.Interfaces;
using EventManagement.Domain.Entities.Form.FormField;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace EventManagement.Application.Organizers.CommunitySubscriptionForms.Queries.GetCommunitySubscriptionForm;

public sealed record GetCommunitySubscriptionFormQuery(int CommunityId)
    : IRequest<GetCommunitySubscriptionFormDto>;

public sealed record GetCommunitySubscriptionFormDto(
    int CommunityId,
    IReadOnlyList<CommunitySubscriptionFormFieldDto> Fields);

internal sealed class GetCommunitySubscriptionFormQueryHandler
    : IRequestHandler<GetCommunitySubscriptionFormQuery, GetCommunitySubscriptionFormDto>
{
    private readonly IApplicationDbContext _context;
    private readonly ICurrentUserAccessor _currentUserAccessor;

    public GetCommunitySubscriptionFormQueryHandler(
        IApplicationDbContext context,
        ICurrentUserAccessor currentUserAccessor)
    {
        _context = context;
        _currentUserAccessor = currentUserAccessor;
    }

    public async Task<GetCommunitySubscriptionFormDto> Handle(GetCommunitySubscriptionFormQuery request, CancellationToken cancellationToken)
    {
        var form = await _context.CommunitySubscriptionForms
            .Include(f => f.Form)
            .Include(f => f.Community)
            .SingleOrDefaultAsync(
                f => f.CommunityId == request.CommunityId
                && f.Community.OrganizerId == _currentUserAccessor.UserId,
                cancellationToken)
            ?? throw new NotFoundException($"Community subscription form with community id {request.CommunityId} not found.");


        return new GetCommunitySubscriptionFormDto(
            form.CommunityId,
            form.Form.Fields.OrderBy(f => f.Order).Select(MapToDto).ToList());
    }

    private static CommunitySubscriptionFormFieldDto MapToDto(FormFieldBase formField)
        => formField switch
        {
            ShortTextFormField shortTextFormField => new ShortTextFormFieldDto(
                shortTextFormField.Name,
                shortTextFormField.Description,
                shortTextFormField.IsRequired,
                FormFieldNames.ShortText,
                shortTextFormField.Order),
            LongTextFormField longTextFormField => new LongTextFormFieldDto(
                longTextFormField.Name,
                longTextFormField.Description,
                longTextFormField.IsRequired,
                FormFieldNames.LongText,
                longTextFormField.Order),
            SingleOptionFormField singleOptionFormField => new SingleOptionFormFieldDto(
                singleOptionFormField.Name,
                singleOptionFormField.Description,
                singleOptionFormField.IsRequired,
                FormFieldNames.SingleOption,
                singleOptionFormField.Order,
                singleOptionFormField.Options),
            MultipleOptionsFormField multipleOptionsFormField => new MultipleOptionsFormFieldDto(
                multipleOptionsFormField.Name,
                multipleOptionsFormField.Description,
                multipleOptionsFormField.IsRequired,
                FormFieldNames.MultipleOptions,
                multipleOptionsFormField.Order,
                multipleOptionsFormField.Options),
            _ => throw new NotSupportedException($"Form field type {formField.Type} is not supported.")
        };
}
