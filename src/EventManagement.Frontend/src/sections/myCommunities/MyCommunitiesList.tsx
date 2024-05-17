import { Grid, Paper, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { axios } from "../../api";
import { Community } from "./types";
import CommunityCard from "./CommunityCard";

const MyCommunitiesList = () => {
  const { data, isFetched } = useMyCommunitiesList();

  return (
    <Grid container spacing={3}>
      {isFetched && data?.items.length === 0 && (
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="body1" align="center">Ви поки не є учасником спільноти</Typography>
          </Paper>
        </Grid>
      )}
      {isFetched && data?.items.map(community => (
        <Grid item xs={12} sm={4} key={community.id}>
          <CommunityCard community={community} />
        </Grid>
      ))}
    </Grid>
  );
};

export default MyCommunitiesList;

function useMyCommunitiesList() {
  return useQuery({
    queryKey: ['user-communities'],
    queryFn: () => axios.get<CommunitiesListQueryResultType>('/api/communities/my').then(res => res.data)
  });
}

type CommunitiesListQueryResultType = {
  items: Community[];
  totalCount: number;
};
