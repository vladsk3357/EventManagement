import { CircularProgress, Stack, Box, Typography, ToggleButton, ToggleButtonGroup, Paper } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { axios } from "../../api";
import { Venue } from "../event/types";
import moment from "moment";
import { Event } from './types';
import EventCard from "./EventCard";
import { useState } from "react";

const MyEventsList = () => {
  const [isPast, setIsPast] = useState(false);
  const { data, isFetched, isLoading } = useMyEventsList(isPast);

  const handleIsPast = (
    event: React.MouseEvent<HTMLElement>,
    newIsPast: boolean | null,
  ) => {
    if (newIsPast !== null) {
      setIsPast(newIsPast);
    }
  };

  if (isLoading && !isFetched || !data) {
    return <CircularProgress />;
  }

  return (
    <Box>
      <Box mb={3} sx={{ display: 'flex', justifyContent: 'end' }}>
        <ToggleButtonGroup
          value={isPast}
          exclusive
          onChange={handleIsPast}
        >
          <ToggleButton value={false}>Майбутні</ToggleButton>
          <ToggleButton value={true}>Минулі</ToggleButton>
        </ToggleButtonGroup>
      </Box>

      <Stack spacing={3}>
        {data.items.length === 0 && (
          <Paper sx={{ p: 2 }}>
            <Typography variant="body1" align="center">Ви поки не є учасником події</Typography>
          </Paper>
        )}
        {data.items.map(item => (
          <Box key={item.date.toISOString(true)}>
            <Typography variant="h4" gutterBottom>{item.date.format("LL")}</Typography>
            {item.events.map(event => (
              <EventCard key={event.id} event={event} />
            ))}
          </Box>
        ))}
      </Stack>
    </Box>
  );
};

export default MyEventsList;

function useMyEventsList(isPast: boolean) {
  return useQuery({
    queryKey: ['user-events', isPast],
    queryFn: () => axios.get<CommunitiesListQueryResultType>(`/api/events/my${isPast ? '?isPast=true' : ''}`).then(res => res.data),
    select: data => ({
      items: data.items.map(item => ({
        date: moment(item.date),
        events: item.events.map(event => ({
          ...event,
          startDate: moment(event.startDate),
        }))
      })),
      totalCount: data.totalCount,
    } as CommunitiesList)
  })
}

type CommunitiesListQueryResultType = {
  items: {
    date: string;
    events: {
      id: number;
      name: string;
      startDate: string;
      venue: Venue;
      attendeesCount: number;
      community: {
        id: number;
        name: string;
      };
      isPast: boolean;
      isCancelled: boolean;
    }[]
  }[];
  totalCount: number;
};

type CommunitiesList = {
  items: {
    date: moment.Moment;
    events: Event[];
  }[];
  totalCount: number;
}
