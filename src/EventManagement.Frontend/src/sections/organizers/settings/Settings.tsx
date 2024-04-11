import { Box, Button, Card, CardContent, CircularProgress, Grid, InputLabel, Tab, Typography } from "@mui/material";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { FormContainer, TextFieldElement, useForm } from "react-hook-form-mui";
import { useParams } from "react-router-dom";
import { axios } from '../../../api';
import { SyntheticEvent, useMemo, useState } from "react";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import SettingsForm from "./SettingsForm";
import { LoadingButton, TabContext, TabList, TabPanel } from "@mui/lab";
import DeleteCommunitySection from "./DeleteCommunitySection";

type FormInputs = {
  name: string;
  location: string
  domain: string;
  url: string;
  shortDescription?: string;
  description: string;
}

const Settings = () => {
  const { communityId: communityIdParam } = useParams();
  const communityId = Number(communityIdParam);
  const { data, isFetching, isFetched } = useGetCommunitySettingsQuery();
  const [tabIndex, setTabIndex] = useState('0');
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

  const handleChange = (event: SyntheticEvent, newTabIndex: string) => {
    setTabIndex(newTabIndex);
  };

  return (
    <>
      <Box>
        <TabContext value={tabIndex}>
          <TabList onChange={handleChange}>
            <Tab label="Інформація" value="0" />
            <Tab label="Видалити спільноту" value="1" />
          </TabList>
          <TabPanel value="0">
            {isFetching && <CircularProgress />}
            {!isFetching && isFetched && (
              <SettingsForm defaultValues={defaultValues!} />
            )}
          </TabPanel>
          <TabPanel value="1">
            <DeleteCommunitySection communityId={communityId} />
          </TabPanel>
        </TabContext>
      </Box>
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
