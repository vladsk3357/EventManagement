using Carter;

namespace EventManagement.WebApi.Modules;

public abstract class ModuleBase : CarterModule
{
    public ModuleBase(string path) : base(Path.Combine("api", path))
    {
    }
}
