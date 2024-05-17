import { useQuery } from "@tanstack/react-query";
import { OfflineVenue, OnlineVenue, Speaker, VenueType } from "./types";
import { axios } from "../../../../api";

export function useSpeakersList(eventId: string) {
  return useQuery({
    queryKey: ["organizers", "speakers", eventId],
    queryFn: async () => {
      const { data } = await axios.get<GetSpeakersListQueryResult>(`/api/organizers/events/${eventId}/speakers`);
      return data;
    },
  })
};

type GetSpeakersListQueryResult = {
  speakers: Speaker[];
};

export function useGetEventQuery(eventId: number) {
  return useQuery({
    queryKey: ['organizers', 'event', eventId],
    queryFn: async () => {
      const { data } = await axios.get<GetEventQueryResult>(`/api/organizers/events/${eventId}`);
      return data;
    },
  });
}

export type GetEventQueryResult = {
  id: number;
  name: string;
  startDate: string;
  endDate: string;
  description: string;
  attendance: {
    limit: number | null;
    shouldBeApproved: boolean;
  },
  venue: OnlineVenue | OfflineVenue;
  communityId: number;
  isCancelled: boolean;
  sessionsStartDate: string | null;
  sessionsEndDate: string | null;
};
