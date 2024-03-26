using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace EventManagement.WebApi.Controllers.Organizers;

[Route("api/organizers/[controller]")]
public abstract class OrganizersApiControllerBase : ApiControllerBase
{
}
