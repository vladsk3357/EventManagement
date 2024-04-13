import { Button, CircularProgress, Grid, InputLabel } from "@mui/material";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { FormContainer, TextFieldElement, useForm } from "react-hook-form-mui";
import { useParams } from "react-router-dom";
import { axios } from '../../../api';
import { useMemo } from "react";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { RichTextEditorElement } from "../../common/primitives";

type FormInputs = {
  name: string;
  location: string
  domain: string;
  url: string;
  shortDescription?: string;
  description: string;
}

type Props = {
  defaultValues: FormInputs;
};

const SettingsForm = ({ defaultValues }: Props) => {
  const { communityId } = useParams();
  const { mutate } = saveCommunitySettings();

  const form = useForm<FormInputs>({ defaultValues, mode: 'onBlur' });

  const onSubmit = (data: FormInputs) => {
    const variables = createMutationVariables(data, Number(communityId));
    mutate(variables);
  };

  return (
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
          <TextFieldElement name="url" label="URL сторінки спільноти" fullWidth required />
        </Grid>
        <Grid item xs={12} mb={2}>
          <TextFieldElement name="shortDescription" label="Коротко опишіть спільноту" fullWidth multiline />
        </Grid>
        <Grid item xs={12} mb={2}>
          <RichTextEditorElement name="description" label="Опис спільноти" />
        </Grid>
        <Grid item xs={12} mb={2}>
          <Button variant="contained" type="submit">Зберегти зміни</Button>
        </Grid>
      </Grid>
    </FormContainer >
  );
};

export default SettingsForm;

function saveCommunitySettings() {
  const { communityId } = useParams();
  const queryClient = useQueryClient();
  return useMutation<SaveCommunitySettingsMutationResult, SaveCommunitySettingsMutationError, SaveCommunitySettingsMutationVariables>({
    mutationFn: variables => axios.put(`/api/organizers/communities/${variables.id}`, variables),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['community', communityId] }),
  });
}

function createMutationVariables(data: FormInputs, id: number): SaveCommunitySettingsMutationVariables {
  return {
    id,
    name: data.name,
    location: data.location,
    domain: data.domain,
    // url: data.url,
    shortDescription: data.shortDescription,
    description: data.description,
  };
}

type SaveCommunitySettingsMutationVariables = {
  id: number;
  name: string;
  location: string
  domain: string;
  // url: string;
  shortDescription?: string;
  description: string;
};

type SaveCommunitySettingsMutationResult = void;

type SaveCommunitySettingsMutationError = {
  name?: string[];
  location?: string[];
  domain?: string[];
  // url?: string[];
  shortDescription?: string[];
  description?: string[];
}
