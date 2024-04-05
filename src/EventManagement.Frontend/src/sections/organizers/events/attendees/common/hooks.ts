import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axios } from '../../../../../api';

export function useDeleteEventAttendeeMutation(communityId: string, eventId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => axios.delete(`/api/organizers/attendees/${id}`),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['organizer', communityId, 'event', eventId, 'attendees'] }),
  });
}
