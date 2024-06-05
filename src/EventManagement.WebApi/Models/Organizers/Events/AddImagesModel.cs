namespace EventManagement.WebApi.Models.Organizers.Events;

public class AddImagesModel
{
    public int EventId { get; set; }

    public IFormFileCollection Images { get; set; } = default!;
}
