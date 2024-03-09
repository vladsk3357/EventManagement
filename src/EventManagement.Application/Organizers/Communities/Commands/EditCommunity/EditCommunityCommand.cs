using EventManagement.Application.Common.Exceptions;
using EventManagement.Application.Common.Interfaces;
using EventManagement.Application.Common.Security;
using EventManagement.Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace EventManagement.Application.Organizers.Communities.Commands.EditCommunity;

[Authorize]
public sealed record EditCommunityCommand(
    int Id,
    string Name,
    string Location,
    string Domain,
    string? ShortDescription,
    string Description
    ) : IRequest;

internal sealed class EditCommunityCommandHandler : IRequestHandler<EditCommunityCommand>
{
    private readonly IApplicationDbContext _context;
    private readonly ICurrentUserAccessor _currentUserAccessor;

    public EditCommunityCommandHandler(IApplicationDbContext context, ICurrentUserAccessor currentUserAccessor)
    {
        _context = context;
        _currentUserAccessor = currentUserAccessor;
    }

    public async Task Handle(EditCommunityCommand request, CancellationToken cancellationToken)
    {
        var community = await _context.Communities
            .FirstOrDefaultAsync(c => c.Id == request.Id && c.OrganizerId == _currentUserAccessor.UserId, cancellationToken) 
            ?? throw new NotFoundException(nameof(Communities), request.Id);

        UpdateCommunityWithCommand(community, request);
        await _context.SaveChangesAsync(cancellationToken);
    }

    private static void UpdateCommunityWithCommand(Community community, EditCommunityCommand request)
    {
        community.Name = request.Name;
        community.Location = request.Location;
        community.Domain = request.Domain;
        community.ShortDescription = request.ShortDescription;
        community.Description = request.Description;
    }
}
