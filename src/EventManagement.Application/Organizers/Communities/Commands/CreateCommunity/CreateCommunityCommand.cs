using EventManagement.Application.Common.Interfaces;
using EventManagement.Application.Common.Security;
using EventManagement.Domain.Entities;
using EventManagement.Domain.Entities.Form;
using MediatR;

namespace EventManagement.Application.Organizers.Communities.Commands.CreateCommunity;

[Authorize]
public sealed record CreateCommunityCommand(string Name, string Location, string Domain) : IRequest<CreateCommunityResultDto>;

internal sealed class CreateCommunityCommandHandler : IRequestHandler<CreateCommunityCommand, CreateCommunityResultDto>
{
    private readonly IApplicationDbContext _context;
    private readonly ICurrentUserAccessor _currentUserAccessor;

    public CreateCommunityCommandHandler(IApplicationDbContext context, ICurrentUserAccessor currentUserAccessor)
    {
        _context = context;
        _currentUserAccessor = currentUserAccessor;
    }

    public async Task<CreateCommunityResultDto> Handle(CreateCommunityCommand request, CancellationToken cancellationToken)
    {
        var entity = request.ToEntity();
        entity.OrganizerId = _currentUserAccessor.UserId;

        await _context.Communities.AddAsync(entity, cancellationToken);
        await _context.SaveChangesAsync(cancellationToken);

        var subscription = new Subscription
        {
            CommunityId = entity.Id,
            UserId = _currentUserAccessor.UserId
        };
        await _context.Subscriptions.AddAsync(subscription, cancellationToken);

        var form = new Form
        {
            Type = FormType.CommunitySubscription,
        };
        var communitySubscriptionForm = new CommunitySubscriptionForm
        {
            CommunityId = entity.Id,
            Form = form
        };
        await _context.CommunitySubscriptionForms.AddAsync(communitySubscriptionForm, cancellationToken);
        await _context.SaveChangesAsync(cancellationToken);

        return new CreateCommunityResultDto(entity.Id);
    }
}
