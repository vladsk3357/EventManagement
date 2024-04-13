import { LoadingButton, TabPanel } from "@mui/lab";
import { Stack } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { FormContainer, TextFieldElement, useForm } from "react-hook-form-mui";
import { useParams } from "react-router-dom";
import { axios } from '../../../api';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

type Props = {
  value: string;
}

const schema = yup.object({
  emails: yup.string()
    .required('Це поле є обов\'язковим')
    .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Введіть валідні електронні пошти через кому')
}).required();

const EmailsInvitationPanel = ({ value }: Props) => {
  const { communityId } = useParams();
  const { mutate, isPending } = useInviteToCommunityMutation();
  const form = useForm<FormInputs>({ mode: 'onBlur', resolver: yupResolver(schema) });

  const handleSubmit = (data: FormInputs) => {
    const variables: InviteToCommunityMutationVariables = {
      communityId: Number(communityId),
      emails: data.emails.split(',').map(email => email.trim()),
    };
    mutate(variables);
  }

  return (
    <TabPanel value={value}>
      <FormContainer formContext={form} onSuccess={handleSubmit}>
        <Stack spacing={2}>
          <TextFieldElement
            name="emails"
            label="Електронні пошти"
            required
            placeholder="Електронні пошти (розділені комами)"
          />
          <LoadingButton loading={isPending} variant="contained" type="submit">Надіслати</LoadingButton>
        </Stack>
      </FormContainer>
    </TabPanel>
  );
};

export default EmailsInvitationPanel;

type FormInputs = {
  emails: string;
};

type InviteToCommunityMutationVariables = {
  communityId: number;
  emails: string[];
};

function useInviteToCommunityMutation() {
  return useMutation({
    mutationFn: (variables: InviteToCommunityMutationVariables) => axios.post(`/api/organizers/communities/${variables.communityId}/invite`, variables),
  });
}
