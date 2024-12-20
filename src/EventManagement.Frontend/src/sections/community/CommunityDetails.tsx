import { Container, Stack, Avatar, Grid, Typography, Box, Button, Tabs, Tab, IconButton } from "@mui/material";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { axios } from '../../api';
import { useParams, Link as RouterLink } from "react-router-dom";
import { SyntheticEvent, useState } from "react";
import { TabContext, TabList } from "@mui/lab";
import DescriptionTabPanel from "./DescriptionTabPanel";
import EventsTabPanel from "./EventsTabPanel";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import SubscribeCommunityButton from "./SubscribeCommunityButton";
import UnsubscribeCommunityButton from "./UnsubscribeCommunityButton";
import CommunityOrganizerButtons from "./CommunityOrganizerButtons";
import { SocialMedia } from "./types";
import CommunitySocialMedia from "./communitySocialMedia";

const CommunityDetails = () => {
  const { communityId: communityIdParam } = useParams();
  const communityId = Number(communityIdParam);
  const { data } = useCommunityDetails(communityId);
  const [tabIndex, setTabIndex] = useState('2');

  const handleChange = (event: SyntheticEvent, newTabIndex: string) => {
    setTabIndex(newTabIndex);
  };

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={1}>
        <Grid container>
          <Grid item xs={12} md={8}>
            <Stack direction="row" sx={{ pt: 1, mb: 3 }}>
              <Avatar alt="community image" src={data?.communityImageUrl || undefined} sx={{ width: 120, height: 120, mr: 2 }} />
              <Stack direction="column">
                <Typography variant="h2">
                  {data?.name}
                </Typography>
                <Stack direction="row" mb={2}>
                  <LocationOnIcon />
                  <Typography variant="body2" sx={{ mr: 2 }}>
                    {data?.location}
                  </Typography>
                  <Typography variant="body2" sx={{ mr: 2 }}>
                    &#8226;
                  </Typography>
                  <Typography variant="body2" sx={{ mr: 2 }}>
                    {data?.subscriberCount} учасників
                  </Typography>
                </Stack>
                {data && <CommunitySocialMedia socialMedia={data?.socialMedia} />}
              </Stack>
            </Stack>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box mb={3} sx={{ display: 'flex', justifyContent: 'end' }}>
              {data && (data.isOrganizer ? (
                <CommunityOrganizerButtons communityId={communityId} />
              ) : data.isSubscribed ? (
                <UnsubscribeCommunityButton communityId={communityId} />
              ) : (
                <SubscribeCommunityButton
                  isShowForm={data.requiresFormAnswer}
                  communityId={communityId}
                  formId={data.formId}
                />
              ))}
            </Box>
          </Grid>
        </Grid>
      </Stack>
      <Box>
        <TabContext value={tabIndex}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={handleChange}>
              <Tab label="Опис" value="1" />
              <Tab label="Події" value="2" />
            </TabList>
          </Box>
          <DescriptionTabPanel value="1" description={data?.description} />
          <EventsTabPanel value="2" />
        </TabContext>
      </Box>
    </Container>
  );
};

export default CommunityDetails;

function useCommunityDetails(communityId: number) {
  return useQuery({
    queryKey: ['community', { id: communityId }],
    queryFn: async () => {
      const res = await axios.get<GetCommunityDetailsQueryResult>(`/api/communities/${communityId}`);
      return res.data;
    },
  })
}

export type GetCommunityDetailsQueryResult = {
  id: number;
  name: string;
  location: string;
  shortDescription: string | null;
  description: string | null;
  subscriberCount: number;
  isSubscribed: boolean;
  isOrganizer: boolean;
  requiresFormAnswer: boolean;
  formId: number;
  communityImageUrl: string | null;
  socialMedia: SocialMedia;
}
