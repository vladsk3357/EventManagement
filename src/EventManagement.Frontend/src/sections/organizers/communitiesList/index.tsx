import { Grid } from "@mui/material";
import CommunityCard from "./CommunityCard";
import CreateCommunityCard from "./CreateCommunityCard";
import { useOrganizerCommunitiesList } from "./hooks";

const CommunitiesList = () => {
  const { data, isFetching, isFetched } = useOrganizerCommunitiesList();

  return (
    <Grid container gap={3}>
      <Grid item xs={12} sm={3}>
        <CreateCommunityCard />
      </Grid>
      {isFetched && data?.items.map(community => (
        <Grid item xs={12} sm={3} key={community.id}>
          <CommunityCard community={community} />
        </Grid>
      ))}
    </Grid>
  );
};

export default CommunitiesList;
