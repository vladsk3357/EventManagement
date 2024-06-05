import { Container, Stack, Typography } from "@mui/material";
import { Helmet } from "react-helmet-async";
import DiscoverEvents from "../../sections/discover/discoverEvents";

const DiscoverEventsPage = () => {
  return (
    <>
      <Helmet>
        <title>Дослідити події | Events</title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Дослідити події
          </Typography>
        </Stack>
        <DiscoverEvents />
      </Container>
    </>
  );
};

export default DiscoverEventsPage;
