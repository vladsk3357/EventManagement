using EventManagement.Application.Common.Interfaces;
using EventManagement.Domain.Entities.Form;
using EventManagement.Domain.Entities.Form.FormField;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace EventManagement.Application.Organizers.CommunitySubscriptionForms.Commands.EditCommunitySubscriptionForm;

public sealed record EditCommunitySubscriptionFormCommand(
       int CommunityId,
       IList<CommunitySubscriptionFormFormFieldDto> Fields) : IRequest;

internal class EditCommunitySubscriptionFormCommandHandler
    : IRequestHandler<EditCommunitySubscriptionFormCommand>
{
    private readonly IApplicationDbContext _context;
    private readonly ICurrentUserAccessor _currentUserAccessor;

    public EditCommunitySubscriptionFormCommandHandler(
        IApplicationDbContext context,
        ICurrentUserAccessor currentUserAccessor)
    {
        _context = context;
        _currentUserAccessor = currentUserAccessor;
    }

    public async Task Handle(EditCommunitySubscriptionFormCommand request, CancellationToken cancellationToken)
    {
        var formFields = new List<FormFieldBase>();
        foreach (var field in request.Fields)
        {
            FormFieldBase formField = field.Type switch
            {
                FormFieldNames.ShortText => new ShortTextFormField
                {
                    Name = field.Name,
                    Description = field.Description,
                    IsRequired = field.IsRequired,
                    Order = field.Order,
                },
                FormFieldNames.LongText => new LongTextFormField
                {
                    Name = field.Name,
                    Description = field.Description,
                    IsRequired = field.IsRequired,
                    Order = field.Order,
                },
                FormFieldNames.SingleOption => new SingleOptionFormField
                {
                    Name = field.Name,
                    Description = field.Description,
                    IsRequired = field.IsRequired,
                    Order = field.Order,
                    Options = field.Properties!.Options,
                },
                FormFieldNames.MultipleOptions => new MultipleOptionsFormField
                {
                    Name = field.Name,
                    Description = field.Description,
                    IsRequired = field.IsRequired,
                    Order = field.Order,
                    Options = field.Properties!.Options,
                },
                _ => throw new NotSupportedException($"Field type '{field.Type}' is not supported.")
            };

            formFields.Add(formField);
        }

        var form = new Form
        {
            Type = FormType.CommunitySubscription,
        };
        form.Fields.AddRange(formFields.OrderBy(f => f.Order));

        var storedForm = await _context.CommunitySubscriptionForms
            .Include(f => f.Form)
            .Include(f => f.Community)
            .SingleOrDefaultAsync(
                f => f.CommunityId == request.CommunityId 
                && f.Community.OrganizerId == _currentUserAccessor.UserId, 
                cancellationToken);

        if (storedForm is not null)
        {
            UpdateForm(storedForm.Form, form);
            _context.Forms.Update(storedForm.Form);
            _context.CommunitySubscriptionForms.Update(storedForm);
        }
        else
        {
            var communitySubscriptionForm = new CommunitySubscriptionForm
            {
                CommunityId = request.CommunityId,
                Form = form,
            };

            _context.CommunitySubscriptionForms.Add(communitySubscriptionForm);
        }

        await _context.SaveChangesAsync(cancellationToken);
    }

    private static void UpdateForm(Form storedForm, Form form)
    {
        storedForm.Fields.Clear();
        storedForm.Fields.AddRange(form.Fields);
    }
}
