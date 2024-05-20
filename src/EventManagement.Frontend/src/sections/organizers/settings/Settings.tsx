import { Box, CircularProgress, Tab } from "@mui/material";
import { useParams } from "react-router-dom";
import { axios } from '../../../api';
import { SyntheticEvent, useMemo, useState } from "react";
import SettingsForm from "./SettingsForm";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import DeleteCommunitySection from "./DeleteCommunitySection";
import SocialMediaForm from "./SocialMediaForm";
import { useGetCommunityDetailsQuery } from "../common";

const Settings = () => {
  const { communityId: communityIdParam } = useParams();
  const communityId = Number(communityIdParam);
  const { data, isFetching, isFetched } = useGetCommunityDetailsQuery();
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

  const socialMediaDefaultValues = useMemo(() => {
    if (!data)
      return undefined;

    return data.socialMedia;
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
            <Tab label="Посилання та соціальні мережі" value="1" />
            <Tab label="Видалити спільноту" value="2" />
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
            {isFetching && <CircularProgress />}
            {!isFetching && isFetched && socialMediaDefaultValues && (
              <SocialMediaForm defaultValues={socialMediaDefaultValues} />
            )}
          </TabPanel>
          <TabPanel value="2">
            <DeleteCommunitySection communityId={communityId} />
          </TabPanel>
        </TabContext>
      </Box>
    </>
  );
};

export default Settings;
