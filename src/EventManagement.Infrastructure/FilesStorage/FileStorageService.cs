using Azure.Storage.Blobs;
using Azure.Storage.Blobs.Models;
using EventManagement.Infrastructure.FilesStorage.Options;
using Microsoft.Extensions.Options;
using EventManagement.Domain.Abstractions;
using EventManagement.Application.Common.Interfaces;

namespace EventManagement.Infrastructure.FilesStorage;

internal class FileStorageService(
    BlobServiceClient client, 
    IOptions<StorageAccountOptions> options) : IFileStorageService
{
    private readonly BlobServiceClient _client = client;
    private readonly StorageAccountOptions _options = options.Value;

    public async Task<Uri> SaveAsync(string fileName, Stream content, CancellationToken cancellationToken = default)
    {
        var containerClient = await GetContainerClientAsync(cancellationToken);

        var blobClient = containerClient.GetBlobClient(fileName);

        await blobClient.UploadAsync(content, true, cancellationToken);

        return blobClient.Uri;
    }

    public async Task<(Uri, string)> SaveAsync(IFile file, CancellationToken cancellationToken = default)
    {
        var containerClient = await GetContainerClientAsync(cancellationToken);
        var fileName = Path.GetRandomFileName() + Path.GetExtension(file.FileName);

        var blobClient = containerClient.GetBlobClient(fileName);
        var uploadOptions = new BlobUploadOptions
        {
            Metadata = new Dictionary<string, string>
            {
                { "OriginalFileName", file.FileName }
            }
        };

        await blobClient.UploadAsync(file.GetReadStream(), uploadOptions, cancellationToken);

        return (blobClient.Uri, fileName);
    }

    private async Task<BlobContainerClient> GetContainerClientAsync(CancellationToken cancellationToken)
    {
        var containerClient = _client.GetBlobContainerClient(_options.Blob.ContainerName);
        await containerClient.CreateIfNotExistsAsync(cancellationToken: cancellationToken);
        return containerClient;
    }

    public async Task<Uri> GetFileUrlAsync(string fileName, CancellationToken cancellationToken = default)
    {
        var containerClient = await GetContainerClientAsync(cancellationToken);
        var blobClient = containerClient.GetBlobClient(fileName);
        return blobClient.Uri;
    }

    public async Task<Dictionary<string, Uri>> GetFileUrlsAsync(IEnumerable<string> fileNames, CancellationToken cancellationToken = default)
    {
        var containerClient = await GetContainerClientAsync(cancellationToken);
        return fileNames.Distinct()
            .ToDictionary(n => n, n => containerClient.GetBlobClient(n).Uri);
    }

    public async Task DeleteIfExistsAsync(string fileName, CancellationToken cancellationToken = default)
    {
        var containerClient = await GetContainerClientAsync(cancellationToken);
        var blobClient = containerClient.GetBlobClient(fileName);
        await blobClient.DeleteIfExistsAsync(cancellationToken: cancellationToken);
    }
}
