import { Button } from "@mui/material";
import { useState } from "react";
import FormPopup from "./FormPopup";
import { Session } from "./types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axios } from "../../../../api";
import { useParams } from "react-router-dom";
import EditIcon from '@mui/icons-material/Edit';
import { minutesToTimeSpanString } from "./utilities";
import { Speaker } from "../common";

type Props = {
  session: Session;
  speakers: Speaker[];
  startDate: moment.Moment;
  endDate: moment.Moment;
}

const EditSessionButton = ({ session, speakers, endDate, startDate }: Props) => {
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
        title="Редагувати доповідь"
        onClose={() => setShowModal(false)}
        isPending={isPending}
        show={showModal}
        onSubmit={data => mutate({
          ...data,
          id: session.id,
          startTime: data.startTime.set({ h: session.startTime.get("h"), m: session.startTime.get("m") }).format('YYYY-MM-DDTHH:mm:ss'),
        })}
        defaultValues={{
          title: session.title,
          description: session.description,
          startTime: session.startTime,
          duration: session.duration,
          speakerIds: session.speakers.map(s => s.id),
        }}
        speakers={speakers}
        endDate={endDate}
        startDate={startDate}
      />
    </>
  );
};

export default EditSessionButton;

function useEditSpeaker(onSuccess?: () => void) {
  const queryClient = useQueryClient();
  const { eventId } = useParams();

  return useMutation({
    mutationFn: async (variables: EditSessionMutationVariables) => {
      const { data } = await axios.put(`/api/organizers/sessions/${variables.id}`, variables);
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

type EditSessionMutationVariables = {
  id: number;
  title: string;
  startTime: string;
  duration: number;
  speakerIds: number[];
};