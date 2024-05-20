using EventManagement.Application.Common.Exceptions;
using EventManagement.Application.Common.Interfaces;
using EventManagement.Application.Common.Security;
using EventManagement.Domain.Entities.Form;
using EventManagement.Domain.Entities.Form.FormField;
using MediatR;

namespace EventManagement.Application.Forms.Queries.GetForm;

[Authorize]
public sealed record GetFormQuery(int Id) : IRequest<FormDto>;

public sealed class GetFormQueryHandler(IApplicationDbContext context) : IRequestHandler<GetFormQuery, FormDto>
{
    private readonly IApplicationDbContext _context = context;

    public async Task<FormDto> Handle(GetFormQuery request, CancellationToken cancellationToken)
    {
        var form = await _context.Forms.FindAsync([request.Id], cancellationToken)
            ?? throw new NotFoundException(nameof(Form), request.Id);

        return new FormDto(form.Id, form.Fields.OrderBy(f => f.Order).Select(MapToDto).ToList());
    }

    private static FormFieldDto MapToDto(FormFieldBase field)
    {
        return field switch
        {
            ShortTextFormField shortTextFormField => new ShortTextFormFieldDto(
                shortTextFormField.Name,
                shortTextFormField.Description,
                shortTextFormField.IsRequired,
                shortTextFormField.Type,
                shortTextFormField.Order),
            LongTextFormField longTextFormField => new LongTextFormFieldDto(
                longTextFormField.Name,
                longTextFormField.Description,
                longTextFormField.IsRequired,
                longTextFormField.Type,
                longTextFormField.Order),
            SingleOptionFormField singleOptionFormField => new SingleOptionFormFieldDto(
                singleOptionFormField.Name,
                singleOptionFormField.Description,
                singleOptionFormField.IsRequired,
                singleOptionFormField.Type,
                singleOptionFormField.Order,
                singleOptionFormField.Options),
            MultipleOptionsFormField multipleOptionsFormField => new MultipleOptionsFormFieldDto(
                multipleOptionsFormField.Name,
                multipleOptionsFormField.Description,
                multipleOptionsFormField.IsRequired,
                multipleOptionsFormField.Type,
                multipleOptionsFormField.Order,
                multipleOptionsFormField.Options),
            _ => throw new NotSupportedException()
        };
    }
}
