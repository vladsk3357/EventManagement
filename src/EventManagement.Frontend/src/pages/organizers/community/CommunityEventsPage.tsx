import { Container, Stack, Typography } from "@mui/material";
import { Helmet } from "react-helmet-async";
import { CreateEventButton, EventsList } from "../../../sections/organizers/eventsList";

const CommunityEventsPage = () => {

  return (
    <>
      <Helmet>
        <title>Події | Events</title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Події
          </Typography>
        </Stack>
        <CreateEventButton />
        <EventsList />
      </Container>
    </>
  );
};

export default CommunityEventsPage;