import { Button, CircularProgress, Grid } from "@mui/material";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { FormContainer, TextFieldElement } from "react-hook-form-mui";
import { useParams } from "react-router-dom";
import { axios } from '../../../api';
import { useMemo } from "react";

type FormInputs = {
  name: string;
  location: string
  domain: string;
  url: string;
  shortDescription?: string;
  description: string;
}

const SettingsForm = () => {
  const { communityId } = useParams();
  const { data, isFetching, isFetched } = useGetCommunitySettingsQuery();
  const { mutate } = saveCommunitySettings();

  const defaultValues: FormInputs | undefined = useMemo(() => {
    if (!data)
      return undefined;

    return {
      name: data.name,
      location: data.location,
      domain: data.domain,
      url: data.url,
      shortDescription: data.shortDescription,
      description: data.description || '',
    };
  }, [data]);

  const onSubmit = (data: FormInputs) => {
    const variables = createMutationVariables(data, Number(communityId));
    mutate(variables);
  };

  return (
    <>
      {isFetching && <CircularProgress />}
      {!isFetching && isFetched && (
        <FormContainer<FormInputs>
          defaultValues={defaultValues}
          onSuccess={onSubmit}
          reValidateMode="onBlur"
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
              <TextFieldElement name="description" label="Опишіть спільноту" fullWidth multiline required />
            </Grid>
            <Grid item xs={12} mb={2}>
              <Button variant="contained" type="submit">Зберегти зміни</Button>
            </Grid>
          </Grid>
        </FormContainer >
      )}
    </>
  );
};

export default SettingsForm;

function useGetCommunitySettingsQuery() {
  const { communityId } = useParams();

  return useQuery({
    queryKey: ['community', communityId],
    queryFn: () => axios.get<GetCommunityQueryResponse>(`/api/organizers/communities/${communityId}`).then(res => res.data)
  });
}

type GetCommunityQueryResponse = {
  id: number;
  name: string;
  location: string;
  domain: string;
  url: string;
  shortDescription?: string;
  description?: string;
}

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
