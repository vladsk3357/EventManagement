using EventManagement.Domain.Abstractions;

namespace EventManagement.Application.Common.Interfaces;

public interface IImagesService
{
    Task<Uri> SaveProfileImage(IFile file, string userId, CancellationToken cancellation = default);
}
