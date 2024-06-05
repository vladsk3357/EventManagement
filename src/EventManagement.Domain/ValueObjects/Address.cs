namespace EventManagement.Domain.ValueObjects;

public class Address(
    string city, 
    string street, 
    string locationName, 
    string? zipCode = null)
{
    public string City { get; } = city;
    public string Street { get; } = street;
    public string LocationName { get; } = locationName;
    public string? ZipCode { get; } = zipCode;
}
