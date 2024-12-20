﻿using EventManagement.Application.Common.Models.Community;

namespace EventManagement.Application.Organizers.Communities.Queries.GetCommunity;

public sealed record GetCommunityDto(
    int Id,
    string Name,
    string Location,
    string Domain,
    string? ShortDescription,
    string? Description,
    string? CommunityImageUrl,
    SocialMediaDto SocialMedia);
