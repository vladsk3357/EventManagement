import { Box, Paper } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axios } from "../../../../api";
import { useParams } from "react-router-dom";

type Props = {
  id: number;
  url: string;
};

const EventImage = ({ id, url }: Props) => {
  const { eventId: eventIdParam } = useParams();
  const eventId = Number(eventIdParam);
  const { mutate } = useDeleteImage(eventId);

  return (
    <Box sx={{ position: 'relative', display: 'flex', flexDirection: 'column' }} >
      <Paper component="img" src={url} alt="event image" />
      <DeleteIcon
        color="error"
        sx={{ position: 'absolute', top: 5, right: 5, cursor: 'pointer' }}
        onClick={() => mutate(id)}
      />
    </Box>
  );
};

export default EventImage;

function useDeleteImage(eventId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => axios.delete(`/api/organizers/events/${eventId}/images/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['eventImages'] });
    },
  });
}