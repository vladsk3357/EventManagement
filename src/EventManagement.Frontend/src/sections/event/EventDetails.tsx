import { useQuery } from "@tanstack/react-query";
import { axios } from '../../api';
import { useParams } from "react-router-dom";
import { Container, Stack, Avatar, Grid, Typography, Box, Button, Tab, Tabs, Link, Skeleton, Card, CardHeader, CardContent } from "@mui/material";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { TabContext, TabList, TabPanel } from "@mui/lab";
import AttendEventButton from "./AttendEventButton";
import UnattendEventButton from "./UnattendEventButton";
import moment from "moment";

const EventDetails = () => {
  const { eventId: eventIdParam } = useParams();
  const eventId = Number(eventIdParam);
  const { data, isLoading, isFetched } = useEventDetails(eventId);

  if (isLoading || !isFetched || !data)
    return null;

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Avatar alt="photoURL" sx={{ width: 120, height: 120, mr: 2 }} />

        <Grid container>
          <Grid item xs={8}>
            <Stack direction="row" sx={{ pt: 1, mb: 3 }}>
              <Typography variant="h4">
                {isLoading ? <Skeleton /> : data?.name}
              </Typography>
            </Stack>
            <Stack direction="row">
              <LocationOnIcon />
              <Typography variant="body2" sx={{ mr: 2 }}>
                {isLoading ? <Skeleton /> : data?.location}
              </Typography>
              <Typography variant="body2" sx={{ mr: 2 }}>
                &#8226;
              </Typography>
              <Typography variant="body2" sx={{ mr: 2 }}>
                {isLoading ? <Skeleton /> : `${data?.attendeesCount} учасників`}
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
            <Typography variant="h6">Дата початку: {data && data.startDate.format("LL")}</Typography>
            <Typography variant="h6">Дата закінчення: {data && data.endDate.format("LL")}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="caption">Створено</Typography>
            <Typography variant="h6">{data?.community.name}</Typography>
          </Grid>
        </Grid>
      </Stack>
      <Box>
        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
          {/* <Link href="#description"><Typography variant="body1" >Опис</Typography></Link>
          <Link href="#schedule">Програма</Link>
          <Link href="#speakers">Спікери</Link> */}
          {/* <Tabs>
            <Tab label="Опис" />
            <Tab label="Програма" />
          </Tabs> */}
        </Box>
        <Box mb={5}>
          <Typography id="description" variant="h3" gutterBottom>Опис</Typography>
          {data?.description && <div dangerouslySetInnerHTML={{ __html: data.description }}></div>}
        </Box>
        <Box mb={5}>
          <Typography id="schedule" variant="h3" gutterBottom>Програма</Typography>
          {data?.schedules.map(schedule => (
            <Box key={schedule.date.toISOString(true)} mb={3}>
              <Typography variant="h5" gutterBottom>{schedule.date.format("LL")}</Typography>
              {schedule.sessions.map(session => (
                <Card key={session.id} sx={{ mb: 2 }}>
                  <CardContent>
                    <Typography variant="body2">{session.startTime.format("LT")} - {session.endTime.format("LT")}</Typography>
                    <Typography variant="subtitle1" gutterBottom>{session.title}</Typography>
                    <Typography variant="body2">{session.speakers.map(speaker => speaker.name).join(', ')}</Typography>
                  </CardContent>
                </Card>
              ))}
            </Box>
          ))}
        </Box>
        <Box mb={5}>
          <Typography id="speakers" variant="h3" gutterBottom>Спікери</Typography>
          <Grid container spacing={2}>
            {/* {data?.speakers.map(speaker => (
              <Grid key={speaker.id} item xs={12} sm={6} md={4} lg={3}>
                <Card>
                  <CardHeader
                    avatar={<Avatar />}
                    title={speaker.name}
                    subheader={`${speaker.title}, ${speaker.company}`}
                  />
                  <CardContent>
                    {speaker.bio}
                  </CardContent>
                </Card>
              </Grid>
            ))} */}
            {data?.speakers.map(speaker => (
              <Grid key={speaker.id} item xs={12} sm={6}>
                <Card>
                  <CardContent>
                    <Typography variant="subtitle1" gutterBottom>{speaker.name}</Typography>
                    <Typography variant="body2">{speaker.title}, {speaker.company}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default EventDetails;

function useEventDetails(eventId: number) {
  return useQuery({
    queryKey: ['event', { id: eventId }],
    queryFn: () => axios.get<EventDetailsQueryResultType>(`/api/events/${eventId}`).then(res => res.data),
    select: data => ({
      ...data,
      startDate: moment(data.startDate),
      endDate: moment(data.endDate),
      schedules: data.schedules.map(s => ({
        date: moment(s.date),
        sessions: s.sessions.map(ses => ({
          ...ses,
          startTime: moment(ses.startTime),
          endTime: moment(ses.endTime),
        })),
      })),
    })
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
  schedules: ScheduleQueryResult[];
  speakers: SpeakerQueryResult[];
}

type ScheduleQueryResult = {
  date: string;
  sessions: SessionQueryResult[];
};

type SessionQueryResult = {
  id: number;
  title: string;
  description: string;
  startTime: string;
  endTime: string;
  speakers: SpeakerQueryResult[];
}

type SpeakerQueryResult = {
  id: number;
  name: string;
  title: string;
  company: string;
  bio: string;
}
