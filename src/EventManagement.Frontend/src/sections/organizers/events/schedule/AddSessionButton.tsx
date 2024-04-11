import { Button } from "@mui/material";
import { useMemo, useState } from "react";
import FormPopup from "./FormPopup";
import { FormInputs } from "./types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axios } from "../../../../api";
import { useParams } from "react-router-dom";
import { Speaker } from "../common/types";
import moment from "moment";


type Props = {
  speakers: Speaker[];
  date: moment.Moment;
  startDate: moment.Moment;
  endDate: moment.Moment;
}

const AddSessionButton = ({ speakers, date, endDate, startDate }: Props) => {
  const { eventId: eventIdParam } = useParams();
  const eventId = Number(eventIdParam);
  const [showModal, setShowModal] = useState(false);
  const { mutate, isPending } = useAddSession(() => setShowModal(false));

  const defaultValues: Partial<FormInputs> = useMemo(() => ({
    title: undefined,
    description: undefined,
    duration: undefined,
    speakerIds: [],
    startTime: date,
  }), [date]);

  const handleSubmit = (data: FormInputs) => {
    mutate({
      ...data,
      startTime: data.startTime.format('YYYY-MM-DDTHH:mm:ss'),
      eventId,
    });
  }

  return (
    <>
      <Button
        variant="contained"
        color="primary"
        onClick={() => setShowModal(true)}
      >
        Додати доповідь
      </Button>
      <FormPopup
        title="Додати нову доповідь"
        onClose={() => setShowModal(false)}
        isPending={isPending}
        show={showModal}
        onSubmit={handleSubmit}
        defaultValues={defaultValues}
        speakers={speakers}
        startDate={startDate}
        endDate={endDate}
      />
    </>
  );
};

export default AddSessionButton;

function useAddSession(onSuccess?: () => void) {
  const queryClient = useQueryClient();
  const { eventId } = useParams();

  return useMutation({
    mutationFn: async (variables: AddSessionsMutationVariables) => {
      const { data } = await axios.post('/api/organizers/sessions', variables);
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

type AddSessionsMutationVariables = {
  title: string;
  startTime: string;
  duration: number;
  description: string;
  speakerIds: number[];
  eventId: number;
};
