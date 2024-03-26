using EventManagement.Application.Profile.Info.Commands.EditInfo;
using EventManagement.Application.Profile.Info.Queries.GetCurrentUserInfo;
using EventManagement.Application.Profile.Info.Queries.GetShortInfo;
using Microsoft.AspNetCore.Mvc;

namespace EventManagement.WebApi.Controllers;

public class ProfileInfoController : ApiControllerBase
{
    [HttpGet("short")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<ProfileInfoDto> GetProfileShortInfo()
    {
        return await Mediator.Send(new GetShortInfoQuery());
    }

    [HttpGet]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<GetCurrentUserInfoDto> GetProfileInfo()
    {
        return await Mediator.Send(new GetCurrentUserInfoQuery());
    }

    [HttpPut]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<EditInfoResult> EditProfileInfo(EditInfoCommand command)
    {
        return await Mediator.Send(command);
    }
}
