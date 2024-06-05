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
public sealed record CreateCommunityCommand(
    string Name, 
    string Location, 
    string Domain) : IRequest<CreateCommunityResultDto>;

internal sealed class CreateCommunityCommandHandler(
    IApplicationDbContext context,
    ICurrentUserAccessor currentUserAccessor,
    ICommunitiesSearchService searchService) 
    : IRequestHandler<CreateCommunityCommand, CreateCommunityResultDto>
{
    private readonly IApplicationDbContext _context = context;
    private readonly ICurrentUserAccessor _currentUserAccessor = currentUserAccessor;
    private readonly ICommunitiesSearchService _searchService = searchService;

    public async Task<CreateCommunityResultDto> Handle(
        CreateCommunityCommand request, 
        CancellationToken cancellationToken)
    {
        var community = await SaveCommunityAsync(request, cancellationToken);
        var id = community.Id;

        await AddOrganizerSubscriptionAsync(id, cancellationToken);
        await AddCommunitySubscriptionFormAsync(id, cancellationToken);
        await AddEmptySocialMediaAsync(id, cancellationToken);
        await _context.SaveChangesAsync(cancellationToken);

        await IndexCommunityAsync(community, cancellationToken);

        return new CreateCommunityResultDto(id);
    }

    private async Task IndexCommunityAsync(Community community, CancellationToken cancellationToken)
    {
        var document = new CommunityIndexDocument(
                    community.Id,
                    community.Name,
                    community.Description,
                    community.Location,
                    community.Domain,
                    1);

        await _searchService.IndexAsync(document, cancellationToken);
    }

    private async Task AddEmptySocialMediaAsync(int communityId, CancellationToken cancellationToken)
    {
        var socialMedia = new SocialMedia 
        { 
            CommunityId = communityId 
        };

        await _context.CommunitySocialMedia.AddAsync(socialMedia, cancellationToken);
    }

    private async Task AddCommunitySubscriptionFormAsync(int communityId, CancellationToken cancellationToken)
    {
        var form = new Form
        {
            Type = FormType.CommunitySubscription,
        };

        var communitySubscriptionForm = new CommunitySubscriptionForm
        {
            CommunityId = communityId,
            Form = form
        };

        await _context.CommunitySubscriptionForms.AddAsync(communitySubscriptionForm, cancellationToken);
    }

    private async Task AddOrganizerSubscriptionAsync(int communityId, CancellationToken cancellationToken)
    {
        var subscription = new Subscription
        {
            CommunityId = communityId,
            UserId = _currentUserAccessor.UserId
        };

        await _context.Subscriptions.AddAsync(subscription, cancellationToken);
    }

    private async Task<Community> SaveCommunityAsync(CreateCommunityCommand request, CancellationToken cancellationToken)
    {
        var entity = request.ToEntity();
        entity.OrganizerId = _currentUserAccessor.UserId;

        await _context.Communities.AddAsync(entity, cancellationToken);
        await _context.SaveChangesAsync(cancellationToken);
        return entity!;
    }
}
