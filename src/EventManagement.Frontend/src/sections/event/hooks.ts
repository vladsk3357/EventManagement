import { useQueryClient, useMutation } from '@tanstack/react-query';
import { axios } from '../../api';
import { EventDetailsQueryResultType } from './EventDetails';


export function useUnattendEvent(eventId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => axios.post(`/api/events/${eventId}/unattend`),
    onSuccess: () => {
      queryClient.setQueryData(['event', { id: eventId }], (data: EventDetailsQueryResultType) => {
        return { ...data, isAttending: false };
      });
    },
  });
}
