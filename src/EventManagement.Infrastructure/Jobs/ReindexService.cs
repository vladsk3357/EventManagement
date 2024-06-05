using EventManagement.Application.Admin.Common;
using Quartz;
using Quartz.Impl.Matchers;

namespace EventManagement.Infrastructure.Jobs;

internal class ReindexService(ISchedulerFactory schedulerFactory) : IReindexService
{
    private readonly ISchedulerFactory _schedulerFactory = schedulerFactory;

    public async Task<bool> ReindexAsync()
    {
        var scheduler = await _schedulerFactory.GetScheduler();
        var keys = await scheduler.GetJobKeys(GroupMatcher<JobKey>.GroupEquals("Index"));
        if (keys.Count == 0)
            return false;

        await Task.WhenAll(keys.Select(key => scheduler.TriggerJob(key)).ToList());
        return true;
    }
}
