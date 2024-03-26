import { useQuery } from "@tanstack/react-query";
import { axios } from '../../api';
import { useParams } from "react-router-dom";
import { Container, Stack, Avatar, Grid, Typography, Box, Button, Tab } from "@mui/material";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { TabContext, TabList, TabPanel } from "@mui/lab";
import AttendEventButton from "./AttendEventButton";
import UnattendEventButton from "./UnattendEventButton";

const EventDetails = () => {
  const { eventId: eventIdParam } = useParams();
  const eventId = Number(eventIdParam);
  const { data, isLoading, isFetched } = useEventDetails(eventId);

  if (!isFetched)
    return null;

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Avatar alt="photoURL" sx={{ width: 120, height: 120, mr: 2 }} />

        <Grid container>
          <Grid item xs={8}>
            <Stack direction="row" sx={{ pt: 1, mb: 3 }}>
              <Typography variant="h4">
                {data?.name}
              </Typography>
            </Stack>
            <Stack direction="row">
              <LocationOnIcon />
              <Typography variant="body2" sx={{ mr: 2 }}>
                {data?.location}
              </Typography>
              <Typography variant="body2" sx={{ mr: 2 }}>
                &#8226;
              </Typography>
              <Typography variant="body2" sx={{ mr: 2 }}>
                {data?.attendeesCount} учасників
              </Typography>
            </Stack>
          </Grid>
          <Grid item xs={4} sx={{ textAlign: 'right' }}>
            <Box mb={3}>
              {data && data.isAttendable && (data.isAttending ? (
                <UnattendEventButton eventId={eventId} />
              ) : (
                <AttendEventButton eventId={eventId} isOrganizer={data.isAttending} />
              ))}
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="h6">Дата початку: {new Date(data!.startDate).toLocaleDateString('uk-UA', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit', weekday: 'short' })}</Typography>
            <Typography variant="h6">Дата закінчення: {new Date(data!.endDate).toLocaleDateString('uk-UA', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit', weekday: 'short' })}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="caption">Створено</Typography>
            <Typography variant="h6">{data!.community.name}</Typography>
          </Grid>
        </Grid>
      </Stack>
      <Box>
        <TabContext value={"1"}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList>
              <Tab label="Опис" value="1" />
            </TabList>
          </Box>
          <TabPanel value="1">
            <Box>
              <Typography variant="h6" gutterBottom>Опис</Typography>
              {data?.description}
            </Box>
          </TabPanel>
        </TabContext>
      </Box>
    </Container>
  );
};

export default EventDetails;

function useEventDetails(eventId: number) {
  return useQuery({
    queryKey: ['event', { id: eventId }],
    queryFn: () => axios.get<EventDetailsQueryResultType>(`/api/events/${eventId}`).then(res => res.data)
  })
}

export type EventDetailsQueryResultType = {
  id: number;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  location: string;
  attendeesCount: number;
  isAttendable: boolean;
  isAttending: boolean;
  isOrganizer: boolean;
  community: {
    id: number;
    name: string;
  }
}
