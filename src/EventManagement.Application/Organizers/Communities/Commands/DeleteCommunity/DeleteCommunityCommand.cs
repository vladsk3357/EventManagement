using EventManagement.Application.Common.Exceptions;
using EventManagement.Application.Common.Interfaces;
using EventManagement.Application.Services.Search;
using EventManagement.Domain.Entities.Community;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace EventManagement.Application.Organizers.Communities.Commands.DeleteCommunity;

public sealed record DeleteCommunityCommand(int Id) : IRequest;

internal sealed class DeleteCommunityCommandHandler : IRequestHandler<DeleteCommunityCommand>
{
    private readonly ICurrentUserService _currentUserService;
    private readonly IApplicationDbContext _context;
    private readonly ICommunitiesSearchService _searchService;

    public DeleteCommunityCommandHandler(
        ICurrentUserService currentUserService,
        IApplicationDbContext context,
        ICommunitiesSearchService searchService)
    {
        _currentUserService = currentUserService;
        _context = context;
        _searchService = searchService;
    }

    public async Task Handle(DeleteCommunityCommand request, CancellationToken cancellationToken)
    {
        var community = await _context.Communities.FirstOrDefaultAsync(c => c.Id == request.Id && c.OrganizerId == _currentUserService.UserId!, cancellationToken) 
            ?? throw new NotFoundException(nameof(Community), request.Id);

        _context.Communities.Remove(community);
        await _context.SaveChangesAsync(cancellationToken);
        await _searchService.DeleteAsync(community.Id);
    }
}

