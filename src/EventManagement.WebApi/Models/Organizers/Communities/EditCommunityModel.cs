namespace EventManagement.WebApi.Models.Organizers.Communities;

public sealed record EditCommunityModel(
    int Id,
    string Name,
    string Location,
    string Domain,
    string? ShortDescription,
    string Description,
    IFormFile? CommunityImage);
