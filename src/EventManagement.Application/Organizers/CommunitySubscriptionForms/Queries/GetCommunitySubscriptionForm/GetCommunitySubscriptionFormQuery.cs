using System.Linq;
using EventManagement.Application.Common.Exceptions;
using EventManagement.Application.Common.Interfaces;
using EventManagement.Domain.Entities.Form.FormField;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace EventManagement.Application.Organizers.CommunitySubscriptionForms.Queries.GetCommunitySubscriptionForm;

public sealed record GetCommunitySubscriptionFormQuery(int CommunityId)
    : IRequest<GetCommunitySubscriptionFormDto>;

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
            form.Form.Fields.OrderBy(f => f.Order).Select(f => new GetCommunitySubscriptionFormFormFieldDto(
                f.Name,
                f.Description,
                f.IsRequired,
                f.Type,
                f.Order,
                GetFieldTypeSpecificProperties(f))).ToList());
    }

    private static FieldTypeSpecificProperties? GetFieldTypeSpecificProperties(FormFieldBase formField)
        => formField switch
        {
            SingleOptionFormField singleOptionFormField => new FieldTypeSpecificProperties(singleOptionFormField.Options),
            MultipleOptionsFormField multipleOptionsFormField => new FieldTypeSpecificProperties(multipleOptionsFormField.Options),
            _ => null
        };
}
