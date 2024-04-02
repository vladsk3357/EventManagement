﻿using EventManagement.Domain.Entities;

namespace EventManagement.Application.Organizers.Sessions.Commands.CreateSession;

internal static class CreateSessionCommandMapper
{
    public static Session ToEntity(this CreateSessionCommand command) => new()
    {
        Title = command.Title,
        StartTime = command.StartTime,
        Duration = command.Duration,
        Description = command.Description,
        EventId = command.EventId,
        Speakers = command.SpeakerIds.Select(id => new Speaker { Id = id }).ToList()
    };
}