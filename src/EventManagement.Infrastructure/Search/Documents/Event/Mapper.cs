using EventManagement.Application.Common.Services.Documents;

namespace EventManagement.Infrastructure.Search.Documents.Event;

internal static class Mapper
{
    public static EventDocument ToDocument(this EventIndexDocument @event) => new(
        @event.Id,
        @event.Name,
        @event.Description,
        "",
        @event.CommunityId,
        @event.StartDate,
        @event.EndDate,
        @event.AttendeesCount);

    public static EventIndexDocument ToIndexDocument(this EventDocument document) => new(
        document.Id,
        document.Name,
        document.Description,
        document.CommunityId,
        document.StartDate,
        document.EndDate,
        document.AttendeesCount);
}
