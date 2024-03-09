using EventManagement.Application.Common.Interfaces;
using EventManagement.Application.Common.Security;
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
        return new CreateCommunityResultDto(entity.Id);
    }
}
