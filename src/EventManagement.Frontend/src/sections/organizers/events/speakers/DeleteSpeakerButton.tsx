import { Button, Snackbar, Alert, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axios } from "../../../../api";
import { useParams } from "react-router-dom";
import { Speaker } from "../common/types";
import DeleteIcon from '@mui/icons-material/Delete';

type Props = {
  speaker: Speaker;
}

const DeleteSpeakerButton = ({ speaker }: Props) => {
  const [showModal, setShowModal] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const { mutate, isPending } = useDeleteSpeaker(() => {
    setShowModal(false);
    setSnackbarOpen(true);
  });

  return (
    <>
      <Button
        variant="outlined"
        color="error"
        startIcon={<DeleteIcon />}
        onClick={() => setShowModal(true)}
      >
        Видалити
      </Button>
      <Dialog
        open={showModal}
        onClose={() => setShowModal(false)}
      >
        <DialogTitle>Видалити спікера</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Ви впевнені, що хочете видалити спікера?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => setShowModal(false)}
          >
            Скасувати
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              mutate(speaker.id);
            }}
          >
            Видалити
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
      >
        <Alert severity="success" sx={{ width: '100%' }}>
          Спікера успішно додано
        </Alert>
      </Snackbar>
    </>
  );
};

export default DeleteSpeakerButton;

function useDeleteSpeaker(onSuccess?: () => void) {
  const queryClient = useQueryClient();
  const { eventId } = useParams();

  return useMutation({
    mutationFn: async (id: number) => {
      const { data } = await axios.delete(`/api/organizers/speakers/${id}`);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["organizers", "speakers", eventId],
      });
      onSuccess && onSuccess();
    },
  });
}

type AddSpeakerMutationVariables = Speaker;
