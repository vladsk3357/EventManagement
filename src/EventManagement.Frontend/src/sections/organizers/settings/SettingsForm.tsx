import { Grid, Snackbar, Alert } from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FormContainer, TextFieldElement, useForm } from "react-hook-form-mui";
import { useParams } from "react-router-dom";
import { axios } from '../../../api';
import { RichTextEditorElement } from "../../common/primitives";
import { useState } from "react";
import { LoadingButton } from "@mui/lab";

type FormInputs = {
  name: string;
  location: string
  domain: string;
  shortDescription?: string;
  description: string;
}

type Props = {
  defaultValues: FormInputs;
};

const SettingsForm = ({ defaultValues }: Props) => {
  const { communityId } = useParams();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const { mutate, isPending } = saveCommunitySettings(() => setSnackbarOpen(true));

  const form = useForm<FormInputs>({ defaultValues, mode: 'onBlur' });
  const { formState } = form;

  const onSubmit = (data: FormInputs) => {
    const variables = createMutationVariables(data, Number(communityId));
    mutate(variables);
  };

  return (
    <>
      <FormContainer<FormInputs>
        onSuccess={onSubmit}
        formContext={form}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} md={6} mb={2}>
            <TextFieldElement name="name" label="Назва спільноти" fullWidth required />
          </Grid>
          <Grid item xs={12} md={6} mb={2}>
            <TextFieldElement name="location" label="Локація" fullWidth required />
          </Grid>
          <Grid item xs={12} mb={2}>
            <TextFieldElement name="domain" label="Напрямок спільноти" fullWidth required />
          </Grid>
          <Grid item xs={12} mb={2}>
            <TextFieldElement name="shortDescription" label="Коротко опишіть спільноту" fullWidth multiline />
          </Grid>
          <Grid item xs={12} mb={2}>
            <RichTextEditorElement name="description" label="Опис спільноти" />
          </Grid>
          <Grid item xs={12} mb={2}>
            <LoadingButton disabled={!formState.isDirty} loading={isPending} variant="contained" type="submit">Зберегти зміни</LoadingButton>
          </Grid>
        </Grid>
      </FormContainer>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
      >
        <Alert severity="success" sx={{ width: '100%' }}>
          Спільноту успішно оновлено
        </Alert>
      </Snackbar>
    </>
  );
};

export default SettingsForm;

function saveCommunitySettings(onSuccess?: () => void) {
  const { communityId } = useParams();
  const queryClient = useQueryClient();
  return useMutation<SaveCommunitySettingsMutationResult, SaveCommunitySettingsMutationError, SaveCommunitySettingsMutationVariables>({
    mutationFn: variables => axios.put(`/api/organizers/communities/${variables.id}`, variables),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['community', communityId] });
      onSuccess && onSuccess();
    },
  });
}

function createMutationVariables(data: FormInputs, id: number): SaveCommunitySettingsMutationVariables {
  return {
    id,
    name: data.name,
    location: data.location,
    domain: data.domain,
    shortDescription: data.shortDescription,
    description: data.description,
  };
}

type SaveCommunitySettingsMutationVariables = {
  id: number;
  name: string;
  location: string
  domain: string;
  shortDescription?: string;
  description: string;
};

type SaveCommunitySettingsMutationResult = void;

type SaveCommunitySettingsMutationError = {
  name?: string[];
  location?: string[];
  domain?: string[];
  shortDescription?: string[];
  description?: string[];
}
