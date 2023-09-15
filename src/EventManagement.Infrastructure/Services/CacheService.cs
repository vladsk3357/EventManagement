using System.Collections.Concurrent;
using System.Text.Json;
using EventManagement.Application.Common.Interfaces;
using Microsoft.Extensions.Caching.Distributed;

namespace EventManagement.Infrastructure.Services;

internal class CacheService : ICacheService
{
    private static readonly ConcurrentDictionary<string, bool> CacheKeys = new();

    private readonly IDistributedCache _distributedCache;

    public CacheService(IDistributedCache distributedCache)
    {
        _distributedCache = distributedCache;
    }

    public async Task<T?> GetAsync<T>(string key, CancellationToken cancellationToken = default) where T : class
    {
        var cachedValue = await _distributedCache.GetStringAsync(key, cancellationToken);

        if (cachedValue is null)
            return null;

        return JsonSerializer.Deserialize<T>(cachedValue);
    }

    public async Task<T> GetAsync<T>(string key, Func<Task<T>> factory, CancellationToken cancellationToken = default) where T : class
    {
        var cachedValue = await GetAsync<T>(key, cancellationToken);

        if (cachedValue is not null)
            return cachedValue;

        var value = await factory();

        await SetAsync(key, value, cancellationToken);

        return value;
    }

    public async Task SetAsync<T>(string key, T value, CancellationToken cancellationToken = default) where T : class
    {
        var cachedValue = JsonSerializer.Serialize(value);

        await _distributedCache.SetStringAsync(key, cachedValue, new DistributedCacheEntryOptions(), cancellationToken);
        CacheKeys.TryAdd(key, true);
    }

    public async Task RemoveAsync(string key, CancellationToken cancellationToken = default)
    {
        await _distributedCache.RemoveAsync(key, cancellationToken);
        CacheKeys.TryRemove(key, out _);
    }

    public async Task RemoveByPrefixAsync(string prefix, CancellationToken cancellationToken = default)
    {
        var tasks = CacheKeys
            .Keys
            .Where(k => k.StartsWith(prefix))
            .Select(k => RemoveAsync(k, cancellationToken));
        await Task.WhenAll(tasks);
    }
}
