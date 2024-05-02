import { LoadingButton } from "@mui/lab";
import { Alert, Grid, Snackbar } from "@mui/material";
import { FormContainer, TextFieldElement, useForm } from "react-hook-form-mui";
import { RichTextEditorElement } from "../../common/primitives";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axios } from '../../../api';

type FormInputs = {
  websiteUrl: string;
  facebookUrl: string;
  twitterUrl: string;
  linkedinUrl: string;
  instagramUrl: string;
  youtubeUrl: string;
  discordUrl: string;
  slackUrl: string;
  twitchUrl: string;
  mediumUrl: string;
  tikTokUrl: string;
  telegramUrl: string;
};

type Props = {
  defaultValues: FormInputs;
};

const SocialMediaForm = ({ defaultValues }: Props) => {
  const { communityId } = useParams();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const { mutate, isPending } = useUpdateSocialMedia(() => setSnackbarOpen(true));

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
            <TextFieldElement name="websiteUrl" label="Website URL" fullWidth type="url" />
          </Grid>
          <Grid item xs={12} md={6} mb={2}>
            <TextFieldElement name="facebookUrl" label="Facebook URL" fullWidth type="url" />
          </Grid>
          <Grid item xs={12} md={6} mb={2}>
            <TextFieldElement name="twitterUrl" label="Twitter URL" fullWidth type="url" />
          </Grid>
          <Grid item xs={12} md={6} mb={2}>
            <TextFieldElement name="linkedinUrl" label="LinkedIn URL" fullWidth type="url" />
          </Grid>
          <Grid item xs={12} md={6} mb={2}>
            <TextFieldElement name="instagramUrl" label="Instagram URL" fullWidth type="url" />
          </Grid>
          <Grid item xs={12} md={6} mb={2}>
            <TextFieldElement name="youtubeUrl" label="YouTube URL" fullWidth type="url" />
          </Grid>
          <Grid item xs={12} md={6} mb={2}>
            <TextFieldElement name="discordUrl" label="Discord URL" fullWidth type="url" />
          </Grid>
          <Grid item xs={12} md={6} mb={2}>
            <TextFieldElement name="slackUrl" label="Slack URL" fullWidth type="url" />
          </Grid>
          <Grid item xs={12} md={6} mb={2}>
            <TextFieldElement name="twitchUrl" label="Twitch URL" fullWidth type="url" />
          </Grid>
          <Grid item xs={12} md={6} mb={2}>
            <TextFieldElement name="mediumUrl" label="Medium URL" fullWidth type="url" />
          </Grid>
          <Grid item xs={12} md={6} mb={2}>
            <TextFieldElement name="tikTokUrl" label="TikTok URL" fullWidth type="url" />
          </Grid>
          <Grid item xs={12} md={6} mb={2}>
            <TextFieldElement name="telegramUrl" label="Telegram URL" fullWidth type="url" />
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
          Посилання успішно оновлено
        </Alert>
      </Snackbar>
    </>
  );
};

export default SocialMediaForm;

function useUpdateSocialMedia(onSuccess?: () => void) {
  const { communityId } = useParams();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateSocialMediaMutationVariables) => {
      return axios.put(`/api/organizers/communities/${data.communityId}/social-media`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['community', communityId] });
      onSuccess && onSuccess();
    },
  })
}

function createMutationVariables(data: FormInputs, communityId: number): UpdateSocialMediaMutationVariables {
  return {
    communityId,
    ...data,
  };
}

type UpdateSocialMediaMutationVariables = {
  communityId: number;
  websiteUrl: string;
  facebookUrl: string;
  twitterUrl: string;
  linkedinUrl: string;
  instagramUrl: string;
  youtubeUrl: string;
  discordUrl: string;
  slackUrl: string;
  twitchUrl: string;
  mediumUrl: string;
  tikTokUrl: string;
  telegramUrl: string;
};
