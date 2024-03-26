import { LoadingButton } from "@mui/lab";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axios } from '../../api';
import { EventDetailsQueryResultType } from "./EventDetails";

type Props = {
  eventId: number;
  isOrganizer: boolean;
}

const AttendEventButton = ({ eventId, isOrganizer }: Props) => {
  const { mutate, isPending } = useAttendEvent(eventId);

  return (
    <LoadingButton
      variant='contained'
      color="primary"
      disabled={isOrganizer}
      loading={isPending}
      onClick={() => mutate()}
    >
      Стати учасником
    </LoadingButton>
  );
};

export default AttendEventButton;

function useAttendEvent(eventId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => axios.post(`/api/events/${eventId}/attend`),
    onSuccess: () => {
      queryClient.setQueryData(['event', { id: eventId }], (data: EventDetailsQueryResultType) => {
        return { ...data, isAttending: true };
      });
    },
  });
}
