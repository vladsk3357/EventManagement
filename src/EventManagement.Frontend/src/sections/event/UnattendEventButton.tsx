import { LoadingButton } from "@mui/lab";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axios } from '../../api';
import { EventDetailsQueryResultType } from "./EventDetails";
import { AttendeeStatus } from "./types";

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
      fullWidth
    >
      Покинути подію
    </LoadingButton>
  );
};

export default UnattendEventButton;

export function useUnattendEvent(eventId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => axios.post(`/api/events/${eventId}/unattend`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['event', { id: eventId }] })
    },
  });
}