import { useQuery } from "@tanstack/react-query";
import { axios } from "../../../api";
import { Community } from "./types";

export function useOrganizerCommunitiesList() {
  return useQuery({
    queryKey: ['organizer-communities'],
    queryFn: () => axios.get<CommunitiesListQueryResultType>('/api/organizers/communities').then(res => res.data)
  });
}

type CommunitiesListQueryResultType = {
  items: Community[];
};
