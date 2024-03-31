import { Button, CircularProgress, Grid, InputLabel } from "@mui/material";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { FormContainer, TextFieldElement, useForm } from "react-hook-form-mui";
import { useParams } from "react-router-dom";
import { axios } from '../../../api';
import { useMemo } from "react";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import SettingsForm from "./SettingsForm";

type FormInputs = {
  name: string;
  location: string
  domain: string;
  url: string;
  shortDescription?: string;
  description: string;
}

const Settings = () => {
  const { data, isFetching, isFetched } = useGetCommunitySettingsQuery();
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

  return (
    <>
      {isFetching && <CircularProgress />}
      {!isFetching && isFetched && (
        <SettingsForm defaultValues={defaultValues!} />
      )}
    </>
  );
};

export default Settings;

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
