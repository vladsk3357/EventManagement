using EventManagement.Application.Common.Exceptions;
using EventManagement.Application.Common.Interfaces;
using EventManagement.Application.Services.Search;
using EventManagement.Domain.Entities;
using EventManagement.Domain.Entities.Community;
using EventManagement.Domain.Entities.Form.Answer;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace EventManagement.Application.Communities.Commands.SubscribeCommunity;

public sealed record SubscribeCommunityCommand(int CommunityId, FormAnswerDto? FormAnswer = null) : IRequest;

internal class SubscribeCommunityCommandHandler(
    IApplicationDbContext context, 
    ICurrentUserAccessor currentUserAccessor) : IRequestHandler<SubscribeCommunityCommand>
    {
    private readonly IApplicationDbContext _context = context;
    private readonly ICurrentUserAccessor _currentUserAccessor = currentUserAccessor;

    public async Task Handle(SubscribeCommunityCommand request, CancellationToken cancellationToken)
    {
        var userId = _currentUserAccessor.UserId!;

        var community = await _context.Communities
            .Include(c => c.SubscriptionForm)
            .ThenInclude(f => f.Form)
            .FirstOrDefaultAsync(c => c.Id == request.CommunityId, cancellationToken)
            ?? throw new NotFoundException(nameof(Community), request.CommunityId);

        var userCommunity = await _context.Subscriptions
            .FirstOrDefaultAsync(s => s.UserId == userId && s.CommunityId == request.CommunityId, cancellationToken);

        if (userCommunity is not null)
            throw new ValidationException("Користувач вже підписаний на спільноту");

        var formAnswerRequired = community.SubscriptionForm.Form.Fields.Count != 0;

        if (formAnswerRequired)
        {
            if (request.FormAnswer is null)
                throw new ValidationException("Форма відповідей обов'язкова");

            var fieldAnswersInput = request.FormAnswer.FieldAnswers.ToDictionary(a => a.Name);
            var fieldAnswers = new List<FormFieldAnswer>();
            foreach (var field in community.SubscriptionForm.Form.Fields)
            {
                if (!fieldAnswersInput.TryGetValue(field.Name, out var fieldAnswer))
                    throw new ValidationException($"Поле {field.Name} обов'язкове для заповнення");

                if (!field.Validate(fieldAnswer.Value))
                    throw new ValidationException($"Поле {field.Name} має невірне значення");

                fieldAnswers.Add(new FormFieldAnswer { FormField = field, Value = fieldAnswer.Value });
            }

            var formAnswer = new FormAnswer
            {
                FormId = community.SubscriptionForm.FormId,
                UserId = userId
            };
            formAnswer.FieldAnswers.AddRange(fieldAnswers);

            await _context.FormAnswers.AddAsync(formAnswer, cancellationToken);
        }

        await _context.Subscriptions.AddAsync(new Subscription
        {
            CommunityId = request.CommunityId,
            UserId = userId,
        }, cancellationToken);

        await _context.SaveChangesAsync(cancellationToken);
    }
}
