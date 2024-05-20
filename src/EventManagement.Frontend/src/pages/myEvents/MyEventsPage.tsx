import { Container, Stack, Typography } from "@mui/material";
import { Helmet } from "react-helmet-async";
import MyEventsList from "../../sections/myEvents";

const MyEventsPage = () => {
  return (
    <>
      <Helmet>
        <title>Мої події | Events</title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h3" gutterBottom>
            Мої події
          </Typography>
        </Stack>
        <MyEventsList />
      </Container>
    </>
  );
};

export default MyEventsPage;
