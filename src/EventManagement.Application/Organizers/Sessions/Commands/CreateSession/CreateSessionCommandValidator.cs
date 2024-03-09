﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FluentValidation;

namespace EventManagement.Application.Organizers.Sessions.Commands.CreateSession;

public sealed class CreateSessionCommandValidator : AbstractValidator<CreateSessionCommand>
{
    public CreateSessionCommandValidator()
    {
        RuleFor(x => x.EventId).NotEmpty();

        RuleFor(x => x.Title).NotEmpty();

        RuleFor(x => x.Description).NotEmpty();

        RuleFor(x => x.StartTime).NotEmpty();

        RuleFor(x => x.Duration).NotEmpty();

        RuleFor(x => x.SpeakerIds).NotEmpty();

        RuleFor(x => x.SpeakerIds)
            .Must(x => x is not null && x.All(id => id is not (int)default));
    }
}
