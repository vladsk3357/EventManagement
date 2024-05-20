import { useQuery } from "@tanstack/react-query";
import { axios } from '../../../api';
import { Button, Card, CardActions, CardContent, CircularProgress, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import BoltIcon from '@mui/icons-material/Bolt';

type Props = {
  communityId: number;
}

const EventsAttendeesSection = ({ communityId }: Props) => {
  const { data, isLoading, isFetched } = useGetEventsAttendeesStatistics(communityId);
  const dynamicIcon = data?.dynamic === Dynamic.Up && <Typography color="green"><KeyboardDoubleArrowUpIcon /></Typography>
    || data?.dynamic === Dynamic.Down && <Typography color="red" ><KeyboardDoubleArrowDownIcon /></Typography> || null;
  return (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Stack direction="row" alignItems="center" spacing={1}>
          <BoltIcon />
          <Stack direction="row" alignItems="center" spacing={2}>
            <Typography variant="h4">Всього реєстрацій</Typography>
            {dynamicIcon}
          </Stack>
        </Stack>
        {isLoading && <CircularProgress />}
        {isFetched && data && (
          <>
            <Typography variant="h3" gutterBottom>{data.count} реєстрації</Typography>
            <Typography
              color={data.dynamic === Dynamic.Up && "green" || data.dynamic === Dynamic.Down && "red" || "inherit"}
              variant="subtitle1">
              {data.previousCount} останнього місяця
            </Typography>
          </>
        )}
        <CardActions sx={{ justifyContent: 'end' }}>
          <Link to={`/organizers/${communityId}/events/list`}>
            <Button endIcon={<ArrowForwardIcon />}>Переглянути всі</Button>
          </Link>
        </CardActions>
      </CardContent>
    </Card>
  );
};

export default EventsAttendeesSection;

function useGetEventsAttendeesStatistics(communityId: number) {
  return useQuery({
    queryKey: ['organizers', 'eventsAttendeesStatistics', { communityId }],
    queryFn: async () => {
      const res = await axios.get<GetEventsAttendeesStatisticsQueryResult>(`/api/organizers/statistics/events-attendees/${communityId}`);
      return res.data;
    },
  });
}

type GetEventsAttendeesStatisticsQueryResult = {
  count: number;
  previousCount: number;
  dynamic: Dynamic;
};

const enum Dynamic {
  Up = 'Up',
  Down = 'Down',
  Equal = 'Equal',
}