import { Button, Snackbar, Alert, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axios } from "../../../../api";
import { useParams } from "react-router-dom";
import { Speaker } from "../common/types";
import DeleteIcon from '@mui/icons-material/Delete';
import { Session } from "./types";
import { LoadingButton } from "@mui/lab";

type Props = {
  session: Session;
}

const DeleteSessionButton = ({ session }: Props) => {
  const [showModal, setShowModal] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const { mutate, isPending } = useDeleteSession(() => {
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
        <DialogTitle>Видалити доповідь</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Ви впевнені, що хочете видалити доповідь?
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
          <LoadingButton
            variant="contained"
            color="error"
            onClick={() => {
              mutate(session.id);
            }}
            loading={isPending}
          >
            Видалити
          </LoadingButton>
        </DialogActions>
      </Dialog >
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
      >
        <Alert severity="success" sx={{ width: '100%' }}>
          Доповідь успішно видалено
        </Alert>
      </Snackbar>
    </>
  );
};

export default DeleteSessionButton;

function useDeleteSession(onSuccess?: () => void) {
  const queryClient = useQueryClient();
  const { eventId } = useParams();

  return useMutation({
    mutationFn: async (id: number) => {
      const { data } = await axios.delete(`/api/organizers/sessions/${id}`);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["organizers", "sessions", eventId],
      });
      onSuccess && onSuccess();
    },
  });
}

type AddSpeakerMutationVariables = Speaker;
