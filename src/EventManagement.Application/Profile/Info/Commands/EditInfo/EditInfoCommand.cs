using EventManagement.Application.Common.Interfaces;
using EventManagement.Domain.Abstractions;
using MediatR;

namespace EventManagement.Application.Profile.Info.Commands.EditInfo;

public sealed record EditInfoCommand(
    string UserName,
    string Name,
    string Location,
    string Information,
    IFile? ProfileImageFile) : IRequest<EditInfoResult>;

internal sealed class EditInfoCommandHandler(
    ICurrentUserAccessor currentUserAccessor,
    IUserService userService,
    IImagesService imagesService,
    IFileStorageService fileStorageService) : IRequestHandler<EditInfoCommand, EditInfoResult>
{
    private readonly ICurrentUserAccessor _currentUserAccessor = currentUserAccessor;
    private readonly IUserService _userService = userService;
    private readonly IImagesService _imagesService = imagesService;
    private readonly IFileStorageService _fileStorageService = fileStorageService;

    public async Task<EditInfoResult> Handle(EditInfoCommand request, CancellationToken cancellationToken)
    {
        var user = request.ToEntity();
        user.Id = _currentUserAccessor.UserId;

        var currentUser = await _userService.GetUserByIdAsync(_currentUserAccessor.UserId, cancellationToken);
        if (request.ProfileImageFile is not null)
        {
            if (currentUser!.ProfileImage is not null)
            {
                await _fileStorageService.DeleteIfExistsAsync(currentUser.ProfileImage, cancellationToken);
            }
            var (url, image) = await _fileStorageService.SaveAsync(request.ProfileImageFile, cancellationToken);
            user.ProfileImage = image;
            var updatedUserWithImage = await _userService.UpdateUserInfoAsync(user, cancellationToken);
            return updatedUserWithImage.ToDto(url.ToString());
        }

        var updatedUser = await _userService.UpdateUserInfoAsync(user, cancellationToken);

        if (updatedUser.ProfileImage is not null)
        {
            var imageUrl = await _fileStorageService.GetFileUrlAsync(updatedUser.ProfileImage, cancellationToken);
            return updatedUser.ToDto(imageUrl.ToString());
        }

        return updatedUser.ToDto(null);
    }
}
