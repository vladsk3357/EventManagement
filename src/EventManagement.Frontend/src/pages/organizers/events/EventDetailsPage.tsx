import { Helmet } from 'react-helmet-async';
import { Container, Stack, Typography } from '@mui/material';
import { EventDetails } from '../../../sections/organizers/events';

const EventDetailsPage = () => {
  return (
    <>
      <Helmet>
        <title>Подія | Events</title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Деталі
          </Typography>
        </Stack>
        <EventDetails />
      </Container>
    </>
  );
};

export default EventDetailsPage;