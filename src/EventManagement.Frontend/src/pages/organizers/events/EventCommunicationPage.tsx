import { Helmet } from 'react-helmet-async';
import { Container, Stack, Typography } from '@mui/material';
import { Communication } from '../../../sections/organizers/events';

const EventCommunicationPage = () => {
  return (
    <>
      <Helmet>
        <title>Подія | Events</title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Комунікація
          </Typography>
        </Stack>
        <Communication />
      </Container>
    </>
  );
};

export default EventCommunicationPage;