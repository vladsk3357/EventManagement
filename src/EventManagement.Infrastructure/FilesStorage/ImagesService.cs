using EventManagement.Application.Common.Interfaces;
using EventManagement.Domain.Abstractions;

namespace EventManagement.Infrastructure.FilesStorage;

internal class ImagesService(FileStorageService fileStorageService) : IImagesService
{
    private const string ProfileImagePrefix = "profile-image_";
    private readonly FileStorageService _fileStorageService = fileStorageService;

    public async Task<Uri> SaveProfileImage(IFile file, string userId, CancellationToken cancellation = default)
    {
        return await _fileStorageService.SaveAsync(
            ProfileImagePrefix + userId + Path.GetExtension(file.FileName),
            file.GetReadStream(), 
            cancellation);
    }
}
