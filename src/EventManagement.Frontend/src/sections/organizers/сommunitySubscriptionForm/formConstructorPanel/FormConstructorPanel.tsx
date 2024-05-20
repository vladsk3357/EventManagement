import { TabPanel } from "@mui/lab";
import { Alert, CircularProgress, Snackbar } from "@mui/material";
import { useCallback, useState } from "react";
import { FormField } from "../../types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { axios } from '../../../../api';
import { useParams } from "react-router-dom";
import Form from "./Form";

type Props = {
  value: string;
}

const FormConstructorPanel = ({ value }: Props) => {
  const { communityId: communityIdParam } = useParams();
  const communityId = Number(communityIdParam);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const { data, isLoading, isFetched } = useGetCommunitySubscriptionForm(communityId);
  const { mutate, isPending } = useEditCommunitySubscriptionForm(communityId, () => setSnackbarOpen(true));

  const handleSubmit = useCallback((data: FormInputs) => {
    mutate({ fields: data.fields, communityId });
  }, [mutate]);

  return (
    <>
      <TabPanel value={value}>
        {isLoading && <CircularProgress />}
        {isFetched && data && (
          <Form formFields={data.fields} onSubmit={handleSubmit} isPending={isPending} />
        )}
      </TabPanel >
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
      >
        <Alert severity="success" sx={{ width: '100%' }}>
          Реєстраційну форму успішно оновлено
        </Alert>
      </Snackbar>
    </>
  );
};

export default FormConstructorPanel;

type FormInputs = {
  fields: FormField[];
};

type GetCommunitySubscriptionFormQueryResult = {
  communityId: number;
  fields: FormFieldInput[];
};

function useGetCommunitySubscriptionForm(communityId: number) {
  return useQuery({
    queryKey: ['communitySubscriptionForm', { communityId }],
    queryFn: async () => {
      const res = await axios.get<GetCommunitySubscriptionFormQueryResult>(`/api/organizers/communities/${communityId}/subscription-form`);
      return res.data;
    }
  });
}

type FieldInput = {
  name: string;
  description?: string;
  isRequired: boolean;
  order: number;
}

export type OptionFieldInput = FieldInput & {
  type: 'SingleOption' | 'MultipleOptions';
  options: string[];
}

export type TextFieldInput = FieldInput & {
  type: 'ShortText' | 'LongText';
};

export type FormFieldInput = (OptionFieldInput | TextFieldInput);

type UpdateCommunitySubscriptionFormInput = {
  communityId: number;
  fields: FormFieldInput[];
};

function useEditCommunitySubscriptionForm(communityId: number, onSuccess?: () => void) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (variables: UpdateCommunitySubscriptionFormInput) => {
      const res = await axios.put(`/api/organizers/communities/${communityId}/subscription-form`, variables);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['communitySubscriptionForm', { communityId }] });
      onSuccess?.();
    }
  })
}
