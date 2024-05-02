using EventManagement.Application.Common.Interfaces;
using EventManagement.Application.Common.Security;
using EventManagement.Application.Common.Services.Documents;
using EventManagement.Application.Services.Search;
using EventManagement.Domain.Entities;
using EventManagement.Domain.Entities.Community;
using EventManagement.Domain.Entities.Form;
using MediatR;

namespace EventManagement.Application.Organizers.Communities.Commands.CreateCommunity;

[Authorize]
public sealed record CreateCommunityCommand(string Name, string Location, string Domain) : IRequest<CreateCommunityResultDto>;

internal sealed class CreateCommunityCommandHandler(
    IApplicationDbContext context,
    ICurrentUserAccessor currentUserAccessor,
    ICommunitiesSearchService searchService) : IRequestHandler<CreateCommunityCommand, CreateCommunityResultDto>
{
    private readonly IApplicationDbContext _context = context;
    private readonly ICurrentUserAccessor _currentUserAccessor = currentUserAccessor;
    private readonly ICommunitiesSearchService _searchService = searchService;

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
        await _context.CommunitySocialMedia.AddAsync(new SocialMedia { CommunityId = entity.Id }, cancellationToken);
        await _context.SaveChangesAsync(cancellationToken);

        var document = new CommunityIndexDocument(
            entity.Id,
            entity.Name,
            entity.Description,
            entity.Location,
            entity.Domain,
            1);

        await _searchService.IndexAsync(document, cancellationToken);

        return new CreateCommunityResultDto(entity.Id);
    }
}
