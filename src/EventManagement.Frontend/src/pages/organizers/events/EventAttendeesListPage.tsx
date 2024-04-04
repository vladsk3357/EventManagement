import { Helmet } from 'react-helmet-async';
import { Container, Stack, Typography } from '@mui/material';
import { EventAttendeesList } from '../../../sections/organizers/events';

const EventAttendeesListPage = () => {
  return (
    <>
      <Helmet>
        <title>Учасники події | Events</title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Учасники події
          </Typography>
        </Stack>
        <EventAttendeesList />
      </Container>
    </>
  );
};

export default EventAttendeesListPage;
