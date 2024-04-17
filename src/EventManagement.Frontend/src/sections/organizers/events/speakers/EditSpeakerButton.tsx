import { Button, Snackbar, Alert } from "@mui/material";
import { useState } from "react";
import FormPopup from "./FormPopup";
import { FormInputs } from "./types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axios } from "../../../../api";
import { useParams } from "react-router-dom";
import { Speaker } from "../common/types";
import EditIcon from '@mui/icons-material/Edit';

type Props = {
  speaker: Speaker;
}

const EditSpeakerButton = ({ speaker }: Props) => {
  const [showModal, setShowModal] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const { mutate, isPending } = useEditSpeaker(() => {
    setShowModal(false);
    setSnackbarOpen(true);
  });

  return (
    <>
      <Button
        variant="outlined"
        color="secondary"
        startIcon={<EditIcon />}
        onClick={() => setShowModal(true)}
      >
        Редагувати
      </Button>
      <FormPopup
        title="Редагувати спікера"
        onClose={() => setShowModal(false)}
        isPending={isPending}
        show={showModal}
        onSubmit={data => mutate({ ...data, id: speaker.id })}
        defaultValues={speaker}
      />
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

export default EditSpeakerButton;

function useEditSpeaker(onSuccess?: () => void) {
  const queryClient = useQueryClient();
  const { eventId } = useParams();

  return useMutation({
    mutationFn: async (variables: EditSpeakerMutationVariables) => {
      const { data } = await axios.put(`/api/organizers/speakers/${variables.id}`, variables);
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

type EditSpeakerMutationVariables = Speaker;
