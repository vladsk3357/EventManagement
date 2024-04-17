import { LoadingButton, TabPanel } from "@mui/lab";
import { CircularProgress, Stack, Snackbar, Alert } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { CheckboxElement, FormContainer, SelectElement, TextFieldElement, useForm } from "react-hook-form-mui";
import { useParams } from "react-router-dom";
import { axios } from '../../../api';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEventsList } from "../common";
import { RichTextEditorElement } from "../../common/primitives";
import { useState } from "react";

type Props = {
  value: string;
}

const schema = yup.object({
  subject: yup.string().required('Це поле є обов\'язковим'),
  body: yup.string().required('Це поле є обов\'язковим'),
  eventId: yup.number().required('Це поле є обов\'язковим'),
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
  eventId: undefined,
  subject: undefined,
  toPending: false,
  toConfirmed: false,
}

const EventCommunicationPanel = ({ value }: Props) => {
  const { communityId: communityIdProp } = useParams();
  const communityId = Number(communityIdProp);

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const { data, isLoading, isFetched } = useEventsList(communityId, 1, 100);
  const { mutate, isPending } = useSendEventEmailMutation(() => setSnackbarOpen(true));
  const form = useForm<FormInputs>({ defaultValues, mode: 'onBlur', resolver: yupResolver(schema) });
  const handleSubmit = (data: FormInputs) => {
    mutate(data);
  };

  return (
    <>
      <TabPanel value={value}>
        <FormContainer<FormInputs> formContext={form} onSuccess={handleSubmit}>
          <Stack spacing={2}>
            {isLoading && <CircularProgress />}
            {isFetched && data && (
              <SelectElement
                name="eventId"
                label="Подія"
                valueKey="value"
                required
                options={data.items.map(event => ({ value: event.id, label: event.name }))}
              />
            )}
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
  eventId: number;
  subject: string;
  body: string;
  toPending: boolean;
  toConfirmed: boolean;
};

function useSendEventEmailMutation(onSuccess?: () => void) {
  return useMutation({
    mutationFn: (variables: FormInputs) => axios.post(`/api/organizers/communities/${variables.eventId}/send-event-email`, variables),
    onSuccess: () => {
      onSuccess && onSuccess();
    },
  });
}
