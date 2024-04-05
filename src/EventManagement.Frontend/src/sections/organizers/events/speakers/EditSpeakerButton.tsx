import { Button } from "@mui/material";
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
  const { mutate, isPending } = useEditSpeaker(() => setShowModal(false));
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
        title="Додати нового спікера"
        onClose={() => setShowModal(false)}
        isPending={isPending}
        show={showModal}
        onSubmit={data => mutate({ ...data, id: speaker.id })}
        defaultValues={speaker}
      />
    </>
  );
};

export default EditSpeakerButton;

function useEditSpeaker(onSuccess?: () => void) {
  const queryClient = useQueryClient();
  const { eventId } = useParams();

  return useMutation({
    mutationFn: async (variables: AddSpeakerMutationVariables) => {
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

type AddSpeakerMutationVariables = Speaker;
