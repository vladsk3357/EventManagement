import { LoadingButton, TabPanel } from "@mui/lab";
import { Alert, Snackbar, Stack } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { FormContainer, TextFieldElement, useForm } from "react-hook-form-mui";
import { useParams } from "react-router-dom";
import { axios } from '../../../api';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { RichTextEditorElement } from "../../common/primitives";
import { useState } from "react";

type Props = {
  value: string;
}

const schema = yup.object({
  subject: yup.string().required('Це поле є обов\'язковим'),
  body: yup.string().required('Це поле є обов\'язковим'),
}).required();

const CommunityCommunicationPanel = ({ value }: Props) => {
  const { communityId } = useParams();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const { mutate, isPending } = useSendCommunityEmailMutation(Number(communityId), () => setSnackbarOpen(true));
  const form = useForm<FormInputs>({ mode: 'onBlur', resolver: yupResolver(schema) });
  const handleSubmit = (data: FormInputs) => {
    mutate(data);
  };

  return (
    <>
      <TabPanel value={value}>
        <FormContainer formContext={form} onSuccess={handleSubmit}>
          <Stack spacing={2}>
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

export default CommunityCommunicationPanel;

type FormInputs = {
  subject: string;
  body: string;
};

function useSendCommunityEmailMutation(communityId: number, onSuccess?: () => void) {
  return useMutation({
    mutationKey: ['organizers', communityId, 'sendCommunityEmail'],
    mutationFn: (variables: FormInputs) => axios.post(`/api/organizers/communities/${communityId}/send-email`, { ...variables, communityId }),
    onSuccess: () => {
      onSuccess?.();
    },
  });
}
