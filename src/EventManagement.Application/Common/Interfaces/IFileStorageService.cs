using EventManagement.Domain.Abstractions;

namespace EventManagement.Application.Common.Interfaces;

public interface IFileStorageService
{
    Task<Uri> SaveAsync(string fileName, Stream content, CancellationToken cancellationToken = default);

    Task<(Uri, string)> SaveAsync(IFile file, CancellationToken cancellationToken = default);

    Task<Uri> GetFileUrlAsync(string fileName, CancellationToken cancellationToken = default);

    Task DeleteIfExistsAsync(string fileName, CancellationToken cancellationToken = default);
    
    Task<Dictionary<string, Uri>> GetFileUrlsAsync(IEnumerable<string> fileNames, CancellationToken cancellationToken = default);
}
