import { LoadingButton } from "@mui/lab";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axios } from '../../api';

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
      fullWidth
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
      queryClient.invalidateQueries({ queryKey: ['event', { id: eventId }] })
    },
  });
}
