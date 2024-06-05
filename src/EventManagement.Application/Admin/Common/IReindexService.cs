namespace EventManagement.Application.Admin.Common;

public interface IReindexService
{
    Task<bool> ReindexAsync();
}
