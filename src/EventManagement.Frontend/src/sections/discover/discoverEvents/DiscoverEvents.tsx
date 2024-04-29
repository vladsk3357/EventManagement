import { Grid, CircularProgress, Box, Pagination } from "@mui/material";
import Filters from "./Filters";
import { useQuery } from "@tanstack/react-query";
import { axios } from "../../../api";
import { useSearchParams } from "react-router-dom";
import { PagedList } from "../../common/types";
import moment from "moment";
import { Venue } from "../../event/types";
import EventCard from "./EventCard";
import { CommunityEvent } from "./types";

const DiscoverEvents = () => {
  const [urlSearchParams, setUrlSearchParams] = useSearchParams();
  const page = Number(urlSearchParams.get('page')) || 1;
  const pageSize = Number(urlSearchParams.get('pageSize')) || 10;
  const { data, isFetched, isLoading } = useDiscoverEventsList(
    page,
    pageSize,
    urlSearchParams.get('sortBy') || undefined,
    urlSearchParams.get('sortOrder') || undefined,
    urlSearchParams.get('startDate') || undefined,
    urlSearchParams.get('endDate') || undefined,
  );

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Filters />
      </Grid>
      {isLoading && <CircularProgress />}
      {isFetched && (
        <>
          {data?.items.map(event => (
            <Grid item xs={12} sm={4} key={event.id}>
              <EventCard event={event} />
            </Grid>
          ))}
          <Box display="flex" justifyContent="center" flexDirection="row" width="100%">
            {data!.totalCount > pageSize && (
              <Pagination
                count={Math.ceil(data!.totalCount / data!.pageSize)}
                hideNextButton={!data!.hasNextPage}
                hidePrevButton={!data!.hasPreviousPage}
                page={page}
                onChange={(_, page) => setUrlSearchParams({ page: page.toString() })}
              />
            )}
          </Box>
        </>
      )}
    </Grid>
  );
};

export default DiscoverEvents;

function useDiscoverEventsList(
  page: number,
  pageSize: number,
  sortBy?: string,
  sortOrder?: string,
  startDate?: string,
  endDate?: string) {
  return useQuery({
    queryKey: ['discover-events', page, pageSize, sortBy, sortOrder, startDate, endDate],
    queryFn: () => axios.get<DiscoverEventsQueryResultType>('/api/search/discover-events', {
      params: {
        page,
        pageSize,
        sortBy,
        sortOrder,
        startDate,
        endDate,
      }
    }).then(res => res.data),
    select: data => ({
      ...data, items: data.items.map(item => ({ ...item, startDate: moment(item.startDate) }) as CommunityEvent),
    }),
  })
}

type DiscoverEventsQueryResultType = PagedList<{
  id: number;
  name: string;
  community: {
    id: number;
    name: string;
  };
  startDate: string;
  attendeesCount: number;
  venue: Venue;
}>;
