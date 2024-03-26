import { Grid } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { axios } from "../../api";
import { Community } from "./types";
import CommunityCard from "./CommunityCard";

const MyCommunitiesList = () => {
  const { data, isFetched } = useMyCommunitiesList();

  return (
    <Grid container gap={3}>
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
