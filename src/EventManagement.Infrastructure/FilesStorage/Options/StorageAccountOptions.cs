namespace EventManagement.Infrastructure.FilesStorage.Options;

internal class StorageAccountOptions
{
    public BlobOptions Blob { get; init; } = default!;

    public class BlobOptions
    {
        public string ContainerName { get; init; } = default!;
    }
}
