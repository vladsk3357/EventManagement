﻿using EventManagement.Domain.Entities.Form;

namespace EventManagement.Domain.Entities.CommunityEvent;

public class Event : AuditableEntity, IHasDomainEvent
{
    public int Id { get; set; }

    public string Name { get; set; } = default!;

    public string Description { get; set; } = default!;

    public DateTime StartDate { get; set; }

    public DateTime EndDate { get; set; }

    public EventVenueBase Venue { get; set; } = default!;

    public int CommunityId { get; set; } = default!;

    public Community.Community Community { get; set; } = default!;

    public string OrganizerId { get; set; } = default!;

    public EventAttendance Attendance { get; set; } = default!;

    public ICollection<Attendee> Attendees { get; set; } = [];

    public EventAttendanceForm AttendanceForm { get; set; } = default!;

    public ICollection<Session> Sessions { get; set; } = [];

    public ICollection<Speaker> Speakers { get; set; } = [];

    public ICollection<EventImage> Images { get; set; } = [];

    public bool IsCancelled { get; set; }

    public List<DomainEvent> DomainEvents { get; set; } = [];
}
