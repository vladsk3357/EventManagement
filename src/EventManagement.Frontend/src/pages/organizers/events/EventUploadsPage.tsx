import { Helmet } from 'react-helmet-async';
import { Container, Stack, Typography } from '@mui/material';
import { Uploads } from '../../../sections/organizers/events';

const EventUploadsPage = () => {
  return (
    <>
      <Helmet>
        <title>Завантаження події | Events</title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Завантаження
          </Typography>
        </Stack>
        <Uploads />
      </Container>
    </>
  );
};

export default EventUploadsPage;
