using Microsoft.Extensions.FileProviders;

namespace EventManagement.WebApi.Models.ProfileInfo;

public sealed record EditInfoModel(
    string UserName,
    string Name,
    string Location,
    string Information,
    IFormFile? ProfileImage);
