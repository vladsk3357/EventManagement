import { Grid, Snackbar, Alert, Avatar } from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FormContainer, TextFieldElement, useForm } from "react-hook-form-mui";
import { useParams } from "react-router-dom";
import { axios } from '../../../api';
import { RichTextEditorElement } from "../../common/primitives";
import { useState } from "react";
import { LoadingButton } from "@mui/lab";
import FileUploadFieldElement from "../../../components/organizers/fileUploadFieldElement";
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

type FormInputs = {
  name: string;
  location: string
  domain: string;
  shortDescription?: string | null;
  description: string;
  communityImage: FileList | null | undefined;
}

type Props = {
  defaultValues: FormInputs;
  communityImageUrl: string | null;
};

const schema: yup.ObjectSchema<FormInputs> = yup.object({
  name: yup.string().required('Це поле обов\'язкове').max(100, 'Максимальна довжина 100 символів'),
  location: yup.string().required('Це поле обов\'язкове').max(100, 'Максимальна довжина 100 символів'),
  domain: yup.string().required('Це поле обов\'язкове').max(100, 'Максимальна довжина 100 символів'),
  shortDescription: yup.string().notRequired().max(400, 'Максимальна довжина 400 символів'),
  description: yup.string().required('Це поле обов\'язкове'),
  communityImage: yup.mixed<FileList>(),
});

const SettingsForm = ({ defaultValues, communityImageUrl }: Props) => {
  const { communityId } = useParams();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const { mutate, isPending } = saveCommunitySettings(() => setSnackbarOpen(true));
  const [communityImagePreview, setCommunityImagePreview] = useState<string | null>(communityImageUrl);

  const form = useForm<FormInputs>({
    defaultValues,
    mode: 'onBlur',
    resolver: yupResolver(schema),
  });
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
          <Grid item xs={12} mb={2}>
            <Avatar
              alt="community image"
              src={communityImagePreview || undefined}
              sx={{ width: 120, height: 120, mb: 2 }} />

            <FileUploadFieldElement
              name="communityImage"
              label="Завантажити картинку спільноти"
              accept="image/*"
              onFileLoadEnd={result => setCommunityImagePreview(result as string | null)}
            />
          </Grid>
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
    mutationFn: async (variables) => {
      const formData = new FormData();
      formData.append('id', variables.id.toString());
      formData.append('name', variables.name);
      formData.append('location', variables.location);
      formData.append('domain', variables.domain);
      formData.append('description', variables.description);
      variables.shortDescription && formData.append('shortDescription', variables.shortDescription);
      variables.communityImage && formData.append('communityImage', variables.communityImage);

      const res = await axios.put(`/api/organizers/communities/${variables.id}`, formData);
      return res.data;
    },
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
    communityImage: data.communityImage?.[0] || null,
  };
}

type SaveCommunitySettingsMutationVariables = {
  id: number;
  name: string;
  location: string
  domain: string;
  shortDescription?: string;
  description: string;
  communityImage: File | null;
};

type SaveCommunitySettingsMutationResult = void;

type SaveCommunitySettingsMutationError = {
  name?: string[];
  location?: string[];
  domain?: string[];
  shortDescription?: string[];
  description?: string[];
}
