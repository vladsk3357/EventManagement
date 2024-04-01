using EventManagement.Application.Forms.Queries.GetForm;
using EventManagement.WebApi.Controllers.Organizers;
using Microsoft.AspNetCore.Mvc;

namespace EventManagement.WebApi.Controllers;

public class FormsController : ApiControllerBase
{
    [HttpGet("{id}")]
    public async Task<FormDto> GetForm(int id)
    {
        return await Mediator.Send(new GetFormQuery(id));
    }

}
