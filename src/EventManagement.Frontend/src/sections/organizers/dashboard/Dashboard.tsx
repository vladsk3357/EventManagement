import { Box, Grid } from "@mui/material";
import { useParams } from "react-router-dom";
import EventsAttendeesSection from "./EventsAttendeesSection";
import SubscribersSection from "./SubscribersSection";
import FutureEventsSection from "./FutureEventsSection";
import FormConstructorSection from "./FormConstructorSection";

const Dashboard = () => {
  const { communityId: communityIdParam } = useParams();
  const communityId = Number(communityIdParam);

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={6} sx={{ display: 'flex', flexDirection: 'column' }}>
        <EventsAttendeesSection communityId={communityId} />
      </Grid>
      <Grid item xs={12} md={6} sx={{ display: 'flex', flexDirection: 'column' }}>
        <SubscribersSection communityId={communityId} />
      </Grid>
      <Grid item xs={12} sx={{ display: 'flex', flexDirection: 'column' }}>
        <FutureEventsSection communityId={communityId} />
      </Grid>
      <Grid item xs={12} sx={{ display: 'flex', flexDirection: 'column' }}>
        <FormConstructorSection communityId={communityId} />
      </Grid>
    </Grid>
  );
};

export default Dashboard;
