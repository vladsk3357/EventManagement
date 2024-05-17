import { LoadingButton, TabPanel } from "@mui/lab";
import { CircularProgress, Stack, Snackbar, Alert } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { CheckboxElement, FormContainer, SelectElement, TextFieldElement, useForm } from "react-hook-form-mui";
import { useParams } from "react-router-dom";
import { axios } from '../../../../api';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEventsList } from "../../common";
import { RichTextEditorElement } from "../../../common/primitives";
import { useState } from "react";

type Props = {
  value: string;
}

const schema = yup.object({
  subject: yup.string().required('Це поле є обов\'язковим'),
  body: yup.string().required('Це поле є обов\'язковим'),
  toPending: yup.boolean().required().test({
    test: function (value) {
      const { toConfirmed } = this.parent;
      return value || toConfirmed;
    },
    message: 'Оберіть хоча б один тип учасників',
  }),
  toConfirmed: yup.boolean().required().test({
    test: function (value) {
      const { toPending } = this.parent;
      return value || toPending;
    },
    message: 'Оберіть хоча б один тип учасників',
  }),
}).required();

const defaultValues: Partial<FormInputs> = {
  body: undefined,
  subject: undefined,
  toPending: false,
  toConfirmed: false,
}

const EventCommunicationPanel = ({ value }: Props) => {
  const { eventId: eventIdProp } = useParams();
  const eventId = Number(eventIdProp);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const { mutate, isPending } = useSendEventEmailMutation(eventId, () => setSnackbarOpen(true));
  const form = useForm<FormInputs>({ defaultValues, mode: 'onBlur', resolver: yupResolver(schema) });
  const handleSubmit = (data: FormInputs) => {
    mutate(data);
  };

  return (
    <>
      <TabPanel value={value}>
        <FormContainer<FormInputs> formContext={form} onSuccess={handleSubmit}>
          <Stack spacing={2}>
            <CheckboxElement name="toPending" label="Надіслати учасникам, які ще не підтвердили участь" />
            <CheckboxElement name="toConfirmed" label="Надіслати учасникам, які підтвердили участь" />
            <TextFieldElement name="subject" label="Тема" required />
            <RichTextEditorElement name="body" label="Сповіщення" required />
            <LoadingButton loading={isPending} variant="contained" type="submit">Надіслати</LoadingButton>
          </Stack>
        </FormContainer>
      </TabPanel>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
      >
        <Alert severity="success" sx={{ width: '100%' }}>
          Лист успішно відіслано
        </Alert>
      </Snackbar>
    </>
  );
};

export default EventCommunicationPanel;

type FormInputs = {
  subject: string;
  body: string;
  toPending: boolean;
  toConfirmed: boolean;
};

function useSendEventEmailMutation(eventId: number, onSuccess?: () => void) {
  return useMutation({
    mutationFn: (variables: FormInputs) => axios.post(`/api/organizers/communities/${eventId}/send-event-email`, variables),
    onSuccess: () => {
      onSuccess && onSuccess();
    },
  });
}
