using EventManagement.Application.Admin.Common;
using MediatR;

namespace EventManagement.Application.Admin.Search.Command;

public sealed record ReindexCommand : IRequest;

public sealed class ReindexCommandHandler(IReindexService reindexService) : IRequestHandler<ReindexCommand>
{
    private readonly IReindexService _reindexService = reindexService;

    async Task IRequestHandler<ReindexCommand>.Handle(ReindexCommand request, CancellationToken cancellationToken)
    {
        await _reindexService.ReindexAsync();
    }
}
