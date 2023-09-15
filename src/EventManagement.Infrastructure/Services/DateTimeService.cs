using EventManagement.Application.Common.Interfaces;

namespace EventManagement.Infrastructure.Services;

public class DateTimeService : IDateTime
{
    public DateTime Now => DateTime.Now;
}
