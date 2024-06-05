using EventManagement.Application.Common.Interfaces;
using EventManagement.Application.Common.Pagination;
using EventManagement.Application.Common.Security;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace EventManagement.Application.Organizers.Events.Queries.GetImages;

[Authorize]
public sealed record GetImagesQuery(int EventId) : IRequest<NonPagedList<ImageDto>>;

internal sealed class GetImagesQueryHandler(
    IApplicationDbContext context,
    IFileStorageService fileStorageService,
    ICurrentUserAccessor currentUserAccessor) : IRequestHandler<GetImagesQuery, NonPagedList<ImageDto>>
{
    private readonly IApplicationDbContext _context = context;
    private readonly IFileStorageService _fileStorageService = fileStorageService;
    private readonly ICurrentUserAccessor _currentUserAccessor = currentUserAccessor;

    public async Task<NonPagedList<ImageDto>> Handle(GetImagesQuery request, CancellationToken cancellationToken)
    {
        var images = await _context.Events
            .Include(e => e.Images)
            .Where(e => e.Id == request.EventId && e.OrganizerId == _currentUserAccessor.UserId)
            .SelectMany(e => e.Images)
            .ToListAsync(cancellationToken);

        var tasks = images.Select(async i => new ImageDto(i.Id, (await _fileStorageService.GetFileUrlAsync(i.FileName, cancellationToken)).ToString())).ToList();
        var imageDtos = await Task.WhenAll(tasks);

        return new NonPagedList<ImageDto>(imageDtos);
    }
}
