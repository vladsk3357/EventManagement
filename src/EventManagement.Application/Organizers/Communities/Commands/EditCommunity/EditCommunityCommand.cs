﻿using EventManagement.Application.Common.Exceptions;
using EventManagement.Application.Common.Interfaces;
using EventManagement.Application.Common.Security;
using EventManagement.Application.Common.Services.Documents;
using EventManagement.Application.Services.Search;
using EventManagement.Domain.Abstractions;
using EventManagement.Domain.Entities.Community;
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
    string Description,
    IFile? CommunityImage) : IRequest;

internal sealed class EditCommunityCommandHandler(
    IApplicationDbContext context,
    ICurrentUserAccessor currentUserAccessor,
    ICommunitiesSearchService searchService,
    IFileStorageService fileStorageService) : IRequestHandler<EditCommunityCommand>
{
    private readonly IApplicationDbContext _context = context;
    private readonly ICurrentUserAccessor _currentUserAccessor = currentUserAccessor;
    private readonly ICommunitiesSearchService _searchService = searchService;
    private readonly IFileStorageService _fileStorageService = fileStorageService;

    public async Task Handle(EditCommunityCommand request, CancellationToken cancellationToken)
    {
        var community = await _context.Communities
            .Include(c => c.Subscriptions)
            .FirstOrDefaultAsync(c => c.Id == request.Id && c.OrganizerId == _currentUserAccessor.UserId, cancellationToken)
            ?? throw new NotFoundException(nameof(Communities), request.Id);

        UpdateCommunityWithCommand(community, request);

        if (request.CommunityImage is not null)
        {
            if (community.CommunityImage is not null)
            {
                await _fileStorageService.DeleteIfExistsAsync(community.CommunityImage, cancellationToken);
            }

            var (_, image) = await _fileStorageService.SaveAsync(request.CommunityImage, cancellationToken);
            community.CommunityImage = image;
        }

        await _context.SaveChangesAsync(cancellationToken);

        var document = new CommunityIndexDocument(
            community.Id,
            community.Name,
            community.Description,
            community.Location,
            community.Domain,
            community.Subscriptions.Count);

        await _searchService.IndexAsync(document, cancellationToken);
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
