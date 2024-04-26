import { Box, CircularProgress, Tab } from "@mui/material";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { axios } from '../../../api';
import { SyntheticEvent, useMemo, useState } from "react";
import SettingsForm from "./SettingsForm";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import DeleteCommunitySection from "./DeleteCommunitySection";

const Settings = () => {
  const { communityId: communityIdParam } = useParams();
  const communityId = Number(communityIdParam);
  const { data, isFetching, isFetched } = useGetCommunitySettingsQuery();
  const [tabIndex, setTabIndex] = useState('0');
  const defaultValues = useMemo(() => {
    if (!data)
      return undefined;

    return {
      name: data.name,
      location: data.location,
      domain: data.domain,
      shortDescription: data.shortDescription,
      description: data.description || '',
      communityImage: null,
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
            {!isFetching && isFetched && data && (
              <SettingsForm
                defaultValues={defaultValues!}
                communityImageUrl={data!.communityImageUrl}
              />
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
  shortDescription?: string;
  description?: string;
  communityImageUrl: string | null;
}
