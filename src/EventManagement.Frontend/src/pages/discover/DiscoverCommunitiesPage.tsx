import { Container, Stack, Typography } from "@mui/material";
import { Helmet } from "react-helmet-async";
import DiscoverCommunities from "../../sections/discover/discoverCommunities";

const DiscoverCommunitiesPage = () => {
  return (
    <>
      <Helmet>
        <title>Дослідити спільноти | Events</title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Дослідити спільноти
          </Typography>
        </Stack>
        <DiscoverCommunities />
      </Container>
    </>
  );
};

export default DiscoverCommunitiesPage;
