import { useQuery } from "@tanstack/react-query";
import { axios } from "../../../api";
import {
  Box,
  CircularProgress,
  Grid,
  Pagination,
} from "@mui/material";
import { Community } from "./types";
import CommunityCard from "./CommunityCard";
import { useSearchParams } from 'react-router-dom';
import { PagedList } from "../../common/types";
import Filters from './Filters';

const DiscoverCommunities = () => {
  const [urlSearchParams, setUrlSearchParams] = useSearchParams();
  const page = Number(urlSearchParams.get('page')) || 1;
  const pageSize = Number(urlSearchParams.get('pageSize')) || 9;
  const { data, isFetched, isLoading } = useDiscoverCommunitiesList(
    page,
    pageSize,
    urlSearchParams.get('sortBy') || undefined,
    urlSearchParams.get('sortOrder') || undefined,
    urlSearchParams.get('location') || undefined,
    urlSearchParams.get('domain') || undefined,
  );

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Filters />
      </Grid>
      {isLoading && <CircularProgress />}
      {isFetched && (
        <>
          {data?.items.map(community => (
            <Grid item xs={12} sm={4} key={community.id} >
              <CommunityCard community={community} />
            </Grid>
          ))}
          <Box display="flex" justifyContent="center" mt={2} flexDirection="row" width="100%">
            {data!.totalCount > pageSize && (
              <Pagination
                count={Math.ceil(data!.totalCount / data!.pageSize)}
                hideNextButton={!data!.hasNextPage}
                hidePrevButton={!data!.hasPreviousPage}
                page={page}
                onChange={(_, page) => setUrlSearchParams(params => { params.set("page", page.toString()); return params; })}
              />
            )}
          </Box>
        </>
      )}
    </Grid>
  );
};

export default DiscoverCommunities;

function useDiscoverCommunitiesList(
  page: number,
  pageSize: number,
  sortBy?: string,
  sortOrder?: string,
  location?: string,
  domain?: string) {
  return useQuery({
    queryKey: ['discover-communities', page, pageSize, sortBy, sortOrder, location, domain],
    queryFn: () => axios.get<DiscoverCommunitiesQueryResultType>('/api/search/discover-communities', {
      params: {
        page,
        pageSize,
        sortBy,
        sortOrder,
        location,
        domain,
      }
    }).then(res => res.data)
  });
}

type DiscoverCommunitiesQueryResultType = PagedList<Community>;
