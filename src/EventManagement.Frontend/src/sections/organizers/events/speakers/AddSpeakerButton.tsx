import { Button, Snackbar, Alert } from "@mui/material";
import { useState } from "react";
import FormPopup from "./FormPopup";
import { FormInputs } from "./types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axios } from "../../../../api";
import { useParams } from "react-router-dom";

const defaultValues: Partial<FormInputs> = {
  name: undefined,
  bio: undefined,
  company: undefined,
  title: undefined,
};

const AddSpeakerButton = () => {
  const { eventId: eventIdParam } = useParams();
  const eventId = Number(eventIdParam);
  const [showModal, setShowModal] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const { mutate, isPending } = useAddSpeaker(() => {
    setShowModal(false);
    setSnackbarOpen(true);
  });
  return (
    <>
      <Button
        variant="contained"
        color="primary"
        onClick={() => setShowModal(true)}
      >
        Додати спікера
      </Button>
      <FormPopup
        title="Додати нового спікера"
        onClose={() => setShowModal(false)}
        isPending={isPending}
        show={showModal}
        onSubmit={data => mutate({ ...data, eventId })}
        defaultValues={defaultValues}
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

export default AddSpeakerButton;

function useAddSpeaker(onSuccess?: () => void) {
  const queryClient = useQueryClient();
  const { eventId } = useParams();

  return useMutation({
    mutationFn: async (variables: AddSpeakerMutationVariables) => {
      const { data } = await axios.post('/api/organizers/speakers', variables);
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

type AddSpeakerMutationVariables = {
  eventId: number;
  name: string;
  title: string;
  company: string;
  bio: string;
};
