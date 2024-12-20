import { useQuery } from "@tanstack/react-query";
import { axios } from '../../api';
import { useParams } from "react-router-dom";
import { Container, Stack, Grid, Typography, Box, Card, CardContent, Alert } from "@mui/material";
import moment from "moment";
import { AttendeeStatus, Schedule, Speaker, Venue } from "./types";
import InformationPanel from "./InformationPanel";
import { DescriptionSection, ImagesSection, SchedulesSection, SpeakersSection } from "./sections";
import { formatAsDateAndMonth } from "../../utils/dateFormatters";

const EventDetails = () => {
  const { eventId: eventIdParam } = useParams();
  const eventId = Number(eventIdParam);
  const { data, isLoading, isFetched } = useEventDetails(eventId);

  if (isLoading || !isFetched || !data)
    return null;

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Grid container columnSpacing={3}>
          <Grid item xs={12} xl={8}>
            <Stack direction="row" sx={{ pt: 1, mb: 3 }} spacing={2}>
              <Box bgcolor="Background" textAlign="center" p={1} sx={{ display: 'flex', alignItems: 'center', width: 'min-content' }}>
                <Typography variant="h2" color="ButtonText">
                  {formatAsDateAndMonth(data.startDate)}
                </Typography>
              </Box>
              <Box>
                <Typography variant="h2">{data.name}</Typography>
              </Box>
            </Stack>
            <Box>
              <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
              </Box>
              {data.isCancelled && (
                <Alert severity="error" sx={{ mb: 3 }}>
                  Ця подія була скасована
                </Alert>
              )}
              <DescriptionSection description={data.description} />
              {data.schedules.length > 0 && <SchedulesSection schedules={data.schedules} />}
              {data.imagesUrls.length > 0 && <ImagesSection imagesUrls={data.imagesUrls} />}
              {data.speakers.length > 0 && <SpeakersSection speakers={data.speakers} />}
            </Box>
          </Grid>
          <Grid item xs={12} xl={4}>
            <InformationPanel
              startDate={data.startDate}
              endDate={data.endDate}
              attendanceCountLeft={data.attendanceCountLeft}
              attendeeStatus={data.attendeeStatus}
              eventId={eventId}
              isOrganizer={data.isOrganizer}
              venue={data.venue}
              isAttendable={data.isAttendable}
            />
            <Box>
              <Card>
                <CardContent sx={{ p: 2 }}>
                  <Typography variant="caption">ОРГАНІЗОВАНО</Typography>
                  <Typography variant="subtitle2">{data.community.name}</Typography>
                </CardContent>
              </Card>
            </Box>
          </Grid>
        </Grid>
      </Stack>
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
    } as EventDetails),
  })
}

type EventDetails = {
  id: number;
  name: string;
  description: string;
  startDate: moment.Moment;
  endDate: moment.Moment;
  venue: Venue;
  attendeesCount: number;
  attendeeStatus: AttendeeStatus | null;
  isOrganizer: boolean;
  attendanceCountLeft: number | null;
  isAttendable: boolean;
  community: {
    id: number;
    name: string;
  }
  schedules: Schedule[];
  speakers: Speaker[];
  imagesUrls: string[];
  isCancelled: boolean;
}

export type EventDetailsQueryResultType = {
  id: number;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  venue: Venue;
  attendeesCount: number;
  attendeeStatus: AttendeeStatus | null;
  isOrganizer: boolean;
  isAttendable: boolean;
  attendanceCountLeft: number | null;
  community: {
    id: number;
    name: string;
  }
  schedules: ScheduleQueryResult[];
  speakers: SpeakerQueryResult[];
  imagesUrls: string[];
  isCancelled: boolean;
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
