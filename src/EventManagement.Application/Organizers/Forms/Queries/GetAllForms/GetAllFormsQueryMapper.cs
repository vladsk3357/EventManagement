using EventManagement.Domain.Entities.Form;

namespace EventManagement.Application.Organizers.Forms.Queries.GetAllForms;

internal static class GetAllFormsQueryMapper
{
    public static FormDto ToDto(this Form form, string communityName) => new(
        form.Id,
        form.Name ?? communityName,
        form.Type);
}
