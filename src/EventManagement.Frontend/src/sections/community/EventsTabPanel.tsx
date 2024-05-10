import { TabPanel } from "@mui/lab";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CircularProgress,
  Grid,
  Pagination,
  Typography,
  Alert,
  ToggleButtonGroup,
  ToggleButton,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { axios } from '../../api';
import { useParams, useSearchParams } from "react-router-dom";
import { PagedList } from "../common/types";
import EventIcon from '@mui/icons-material/Event';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { Link as RouterLink } from 'react-router-dom';
import { Venue } from "../event/types";
import moment from "moment";
import { useState } from "react";

type Props = {
  value: string;
}

const EventsTabPanel = ({ value }: Props) => {
  const [urlSearchParams, setUrlSearchParams] = useSearchParams();
  const page = Number(urlSearchParams.get('page')) || 1;
  const pageSize = Number(urlSearchParams.get('pageSize')) || 10;
  const { communityId } = useParams();

  const [isPast, setIsPast] = useState(false);
  const handleIsPast = (
    event: React.MouseEvent<HTMLElement>,
    newIsPast: boolean | null,
  ) => {
    if (newIsPast !== null) {
      setIsPast(newIsPast);
    }
  };

  const { data, isLoading, isFetched } = useCommunityEventsList(page, pageSize, isPast);

  return (
    <TabPanel value={value}>
      <Box>
        <Typography variant="h3" gutterBottom>Події</Typography>
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
        {isLoading && <CircularProgress />}
        {isFetched && (
          <>
            <Grid container gap={3}>
              {
                data!.items.map(event => (
                  <Grid item xs={12} key={event.id}>
                    <Card>
                      <RouterLink to={`/community/${communityId}/${event.id}`}>
                        <CardActionArea sx={{ minHeight: 200 }} >
                          <CardContent>
                            <Box mb={2}>
                              <Typography variant="h6">{event.name}</Typography>
                              <Typography variant="body2">{event.attendeesCount} учасників йде</Typography>
                              <Typography variant="body2"><EventIcon /> {moment(event.startDate).format("LL")}</Typography>
                              <Typography variant="body2"><LocationOnIcon /> {event.venue.type === 'Online' ? 'Онлайн' : event.venue.address.locationName}</Typography>
                            </Box>
                            {event.isCancelled && (
                              <Alert severity="error">
                                Ця подія була скасована
                              </Alert>
                            )}
                          </CardContent>
                        </CardActionArea>
                      </RouterLink>
                    </Card>
                  </Grid>
                ))
              }
            </Grid>
            {
              data!.totalCount > pageSize && (
                <Pagination
                  count={Math.ceil(data!.totalCount / data!.pageSize)}
                  hideNextButton={!data!.hasNextPage}
                  hidePrevButton={!data!.hasPreviousPage}
                  page={page}
                  onChange={(_, page) => setUrlSearchParams({ page: page.toString() })}
                />
              )
            }
          </>
        )}
      </Box>
    </TabPanel>
  );
};

export default EventsTabPanel;

function useCommunityEventsList(page: number, pageSize: number, isPast: boolean) {
  const { communityId } = useParams();
  return useQuery({
    queryKey: ['community-events', { communityId, page, pageSize, isPast }],
    queryFn: () => axios.get<CommunityEventsListQueryResultType>(`/api/events?communityId=${communityId}&page=${page}&pageSize=${pageSize}${isPast ? '&isPast=true' : ''}`).then(res => res.data),
  })
}

type Event = {
  id: number;
  name: string;
  attendeesCount: number;
  venue: Venue;
  startDate: string;
  isCancelled: boolean;
};

type CommunityEventsListQueryResultType = PagedList<Event>;