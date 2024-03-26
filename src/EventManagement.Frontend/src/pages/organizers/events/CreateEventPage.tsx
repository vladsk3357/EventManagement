import { Helmet } from 'react-helmet-async';
// @mui
import { Container, Stack, Typography } from '@mui/material';
import { CreateEventForm } from '../../../sections/organizers/events';

const CreateEventPage = () => {
  return (
    <>
      <Helmet>
        <title>Створити нову подію | Events</title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Створити нову подію
          </Typography>
        </Stack>
        <CreateEventForm />
      </Container>
    </>
  );
};

export default CreateEventPage;