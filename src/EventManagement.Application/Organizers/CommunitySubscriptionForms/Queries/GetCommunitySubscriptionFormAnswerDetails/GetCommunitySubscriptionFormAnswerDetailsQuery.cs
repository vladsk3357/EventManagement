using EventManagement.Application.Common.Exceptions;
using EventManagement.Application.Common.Interfaces;
using EventManagement.Domain.Entities.Form.Answer;
using EventManagement.Domain.Entities.Form.FormField;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace EventManagement.Application.Organizers.CommunitySubscriptionForms.Queries.GetCommunitySubscriptionFormAnswerDetails;

public sealed record GetCommunitySubscriptionFormAnswerDetailsQuery(int CommunityId, int AnswerId) : IRequest<GetCommunitySubscriptionFormAnswerDetailsDto>;

public sealed record GetCommunitySubscriptionFormAnswerDetailsDto(
    int CommunityId,
    int AnswerId,
    string UserId,
    string UserName,
    string Name,
    DateTime AnswerDate,
    IReadOnlyList<FormFieldAnswerDto> Fields);

internal sealed class GetCommunitySubscriptionFormAnswerDetailsQueryHandler : IRequestHandler<GetCommunitySubscriptionFormAnswerDetailsQuery, GetCommunitySubscriptionFormAnswerDetailsDto>
{
    private readonly IApplicationDbContext _context;
    private readonly ICurrentUserAccessor _currentUserAccessor;
    private readonly IUserService _userService;

    public GetCommunitySubscriptionFormAnswerDetailsQueryHandler(
        IApplicationDbContext context,
        ICurrentUserAccessor currentUserAccessor,
        IUserService userService)
    {
        _context = context;
        _currentUserAccessor = currentUserAccessor;
        _userService = userService;
    }

    public async Task<GetCommunitySubscriptionFormAnswerDetailsDto> Handle(GetCommunitySubscriptionFormAnswerDetailsQuery request, CancellationToken cancellationToken)
    {
        var formAnswer = await _context.FormAnswers
            .Include(f => f.Form)
            .ThenInclude(f => f.CommunitySubscriptionForm)
            .ThenInclude(f => f!.Community)
            .FirstOrDefaultAsync(f => f.Id == request.AnswerId 
                && f.Form.CommunitySubscriptionForm!.Community.OrganizerId == _currentUserAccessor.UserId,
                cancellationToken) ?? throw new NotFoundException(nameof(FormAnswer), request.AnswerId);

        var user = await _userService.GetUserByIdAsync(formAnswer.UserId, cancellationToken);

        return new GetCommunitySubscriptionFormAnswerDetailsDto(
            formAnswer.Form.CommunitySubscriptionForm!.CommunityId,
            formAnswer.Id,
            user!.Id,
            user.UserName,
            user.Name,
            formAnswer.Created,
            formAnswer.FieldAnswers.Select(MapToDto).ToList());
    }

    private static FormFieldAnswerDto MapToDto(FormFieldAnswer field)
    {
        return field.FormField switch
        {
            ShortTextFormField shortTextFormField => new ShortTextFormFieldAnswerDto(
                shortTextFormField.Name,
                shortTextFormField.Description,
                shortTextFormField.IsRequired,
                shortTextFormField.Type,
                shortTextFormField.Order,
                field.Value),
            LongTextFormField longTextFormField => new LongTextFormFieldAnswerDto(
                longTextFormField.Name,
                longTextFormField.Description,
                longTextFormField.IsRequired,
                longTextFormField.Type,
                longTextFormField.Order,
                field.Value),
            SingleOptionFormField singleOptionFormField => new SingleOptionFormFieldAnswerDto(
                singleOptionFormField.Name,
                singleOptionFormField.Description,
                singleOptionFormField.IsRequired,
                singleOptionFormField.Type,
                singleOptionFormField.Order,
                field.Value,
                singleOptionFormField.Options),
            MultipleOptionsFormField multipleOptionsFormField => new MultipleOptionsFormFieldAnswerDto(
                multipleOptionsFormField.Name,
                multipleOptionsFormField.Description,
                multipleOptionsFormField.IsRequired,
                multipleOptionsFormField.Type,
                multipleOptionsFormField.Order,
                field.Value,
                multipleOptionsFormField.Options),
            _ => throw new NotSupportedException()
        };
    }
}