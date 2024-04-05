import { Helmet } from 'react-helmet-async';
import { Container, Stack, Typography } from '@mui/material';
import { SpeakersList } from '../../../sections/organizers/events';

const EventSpeakersListPage = () => {
  return (
    <>
      <Helmet>
        <title>Спікери події | Events</title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Учасники події
          </Typography>
        </Stack>
        <SpeakersList />
      </Container>
    </>
  );
};

export default EventSpeakersListPage;
