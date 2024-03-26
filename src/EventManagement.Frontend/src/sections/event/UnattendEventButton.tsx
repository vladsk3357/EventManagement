import { LoadingButton } from "@mui/lab";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axios } from '../../api';
import { EventDetailsQueryResultType } from "./EventDetails";

type Props = {
  eventId: number;
}

const UnattendEventButton = ({ eventId }: Props) => {
  const { mutate, isPending } = useUnattendEvent(eventId);

  return (
    <LoadingButton
      variant='contained'
      color="error"
      loading={isPending}
      onClick={() => mutate()}
    >
      Покинути подію
    </LoadingButton>
  );
};

export default UnattendEventButton;

function useUnattendEvent(eventId: number) {
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
