import { Box, CircularProgress, Typography, Paper, Tooltip, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { axios } from "../../../../api";
import { useGetEventQuery, useSpeakersList } from "../common";
import AddSessionButton from "./AddSessionButton";
import { useState } from "react";
import CurrentDateSelect from "./CurrentDateSelect";
import moment from "moment";
import { Session } from "./types";
import EditSessionButton from "./EditSessionButton";
import DeleteSessionButton from "./DeleteSessionButton";
import WarningIcon from '@mui/icons-material/Warning';

const EventSchedule = () => {
  const { eventId: eventIdParam } = useParams();
  const eventId = Number(eventIdParam);
  const {
    data: sessions,
    isLoading: isSessionsLoading,
    isFetched: isSessionsFetched,
  } = useGetSchedule();

  const {
    data: speakersData,
    isLoading: isLoadingSpeakers,
    isFetched: isFetchedSpeakers,
  } = useSpeakersList(eventIdParam!);

  const { data, isLoading, isFetched } = useGetEventQuery(Number(eventId));

  const [selectedDate, setSelectedDate] = useState<moment.Moment | null>(null);

  return (
    <Box>
      <Box mb={3}>
        {isSessionsLoading && isLoading && <CircularProgress />}
        {isSessionsFetched && isFetched && sessions && data && (
          <CurrentDateSelect
            startDate={data.startDate}
            endDate={data.endDate}
            value={selectedDate}
            setValue={setSelectedDate}
          />
        )}
      </Box>
      <TableContainer component={Paper} sx={{ mb: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="right">Назва</TableCell>
              <TableCell align="right">Початок/Кінець</TableCell>
              <TableCell align="right">Тривалість</TableCell>
              <TableCell align="right">Спікери</TableCell>
              <TableCell align="right">Дія</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {isSessionsLoading && (
              <TableRow>
                <TableCell colSpan={5} align="center"><CircularProgress /></TableCell>
              </TableRow>
            )}
            {isSessionsFetched && sessions && selectedDate && (sessions.length
              ? sessions.filter(s => isSelectedDate(s, selectedDate)).map((session) => (
                <TableRow
                  key={session.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    <Stack direction="row">
                      {data && session.endTime.isAfter(moment(data.endDate)) && (
                        <Tooltip title="Доповідь закінчується після кінця події. ЇЇ не показано в розкладі." placement="top">
                          <Typography mr={1} color="orange"><WarningIcon /></Typography>
                        </Tooltip>
                      )}
                      {session.title}
                    </Stack>
                  </TableCell>
                  <TableCell align="right">{session.startTime.format("kk:mm")} - {session.endTime.format("kk:mm")}</TableCell>
                  <TableCell align="right">{session.duration}</TableCell>
                  <TableCell align="right">
                    {session.speakers.map(s => s.name).join(', ')}
                  </TableCell>
                  <TableCell align="right" sx={{ display: 'flex', justifyContent: 'end' }}>
                    <Stack spacing={2} direction="row" >
                      {isFetchedSpeakers && isFetched && speakersData && data && (
                        <EditSessionButton
                          speakers={speakersData.speakers}
                          session={session}
                          endDate={moment(data.endDate)}
                          startDate={moment(data.startDate)}
                        />
                      )}
                      <DeleteSessionButton session={session} />
                    </Stack>
                  </TableCell>
                </TableRow>
              )) : (
                <TableRow>
                  <TableCell colSpan={5} align="center">Доповіді ще не додано</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box>
        {isLoadingSpeakers && isLoading && <CircularProgress />}
        {isFetchedSpeakers && isFetched && speakersData && data && selectedDate && (
          <AddSessionButton
            date={moment(selectedDate)}
            speakers={speakersData.speakers}
            endDate={moment(data.endDate)}
            startDate={moment(data.startDate)}
          />
        )}
      </Box>
    </Box>
  );
};

export default EventSchedule;

function useGetSchedule() {
  const { eventId } = useParams();

  return useQuery({
    queryKey: ['organizers', 'sessions', eventId],
    queryFn: async () => {
      const { data } = await axios.get<GetSessionsQueryResponse>(`/api/organizers/events/${eventId}/sessions`);
      return data;
    },
    select: ({ sessions }) => sessions.map(s => ({ ...s, startTime: moment(s.startTime), endTime: moment(s.endTime) } as Session)),
  });
}

type GetSessionsQueryResponse = {
  sessions: {
    id: number;
    title: string;
    startTime: string;
    endTime: string;
    duration: number;
    speakers: {
      id: number;
      name: string;
    }[];
  }[];
};

function isSelectedDate(session: Session, selectedDate: moment.Moment) {
  return selectedDate.isBetween(session.startTime, session.endTime, 'day', '[]');
}