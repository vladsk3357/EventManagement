import { useQuery } from '@tanstack/react-query';
import { axios } from '../../../api';
import { PagedList } from '../../common/types';
import { Venue } from '../../event/types';
import { useParams } from 'react-router-dom';

export function useSubscribersList(communityId: number, page: number, pageSize: number) {
  return useQuery({
    queryKey: ['organizer', communityId, 'subscribers', page, pageSize],
    queryFn: () => axios.get<GetCommunitySubscribersQueryResultType>(`/api/organizers/communities/${communityId}/subscribers`, {
      params: {
        page,
        pageSize,
      }
    }).then(res => res.data),
  });
}

type GetCommunitySubscribersQueryResultType = PagedList<CommunitySubscriber>;

type CommunitySubscriber = {
  id: number;
  name: string;
  userName: string;
  joinDate: string;
}

export function useEventsList(communityId: number, page: number, pageSize: number, isPast: boolean = false) {
  return useQuery({
    queryKey: ['organizer', communityId, 'events', page, pageSize, isPast],
    queryFn: () => axios.get<GetCommunityEventsQueryResultType>(`/api/organizers/communities/${communityId}/events`, {
      params: {
        page,
        pageSize,
        isPast,
      }
    }).then(res => res.data),
  });
}

type GetCommunityEventsQueryResultType = PagedList<CommunityEvent>;

type CommunityEvent = {
  id: number;
  name: string;
  venue: Venue;
  startDate: string;
  attendeesCount: number;
  isCancelled: boolean;
}

export function useGetCommunityDetailsQuery() {
  const { communityId } = useParams();

  return useQuery({
    queryKey: ['community', communityId],
    queryFn: () => axios.get<GetCommunityQueryResponse>(`/api/organizers/communities/${communityId}`).then(res => res.data)
  });
}

type GetCommunityQueryResponse = {
  id: number;
  name: string;
  location: string;
  domain: string;
  shortDescription?: string;
  description?: string;
  communityImageUrl: string | null;
  socialMedia: {
    communityId: number;
    websiteUrl: string;
    facebookUrl: string;
    twitterUrl: string;
    linkedinUrl: string;
    instagramUrl: string;
    youtubeUrl: string;
    discordUrl: string;
    slackUrl: string;
    twitchUrl: string;
    mediumUrl: string;
    tikTokUrl: string;
    telegramUrl: string;
  };
}