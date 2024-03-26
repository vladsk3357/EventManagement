namespace EventManagement.Application.Organizers.RegistrationForm.Commands;

public record FormFieldDto(
    string Name, 
    string? Description, 
    bool IsRequired, 
    string FieldType,
    int Order);
