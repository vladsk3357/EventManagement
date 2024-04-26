using Azure.Storage.Blobs;
using EventManagement.Application.Common.Interfaces;
using EventManagement.Infrastructure.FilesStorage.Options;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace EventManagement.Infrastructure.FilesStorage;

internal static class DependencyInjection
{
    public static IServiceCollection AddFilesStorage(this IServiceCollection services, IConfiguration configuration)
    {
        services.ConfigureOptions<StorageAccountOptionsSetup>();
        services.AddSingleton(x => new BlobServiceClient(configuration.GetConnectionString("StorageAccount")));
        services.AddScoped<FileStorageService>();
        services.AddScoped<IFileStorageService, FileStorageService>();
        services.AddScoped<IImagesService, ImagesService>();

        return services;
    }
}
