import { Helmet } from 'react-helmet-async';
import { Container, Stack, Typography } from '@mui/material';
import { EventSchedule } from '../../../sections/organizers/events';

const EventSchedulePage = () => {
  return (
    <>
      <Helmet>
        <title>Розклад | Events</title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Розклад
          </Typography>
        </Stack>
        <EventSchedule />
      </Container>
    </>
  );
};

export default EventSchedulePage;