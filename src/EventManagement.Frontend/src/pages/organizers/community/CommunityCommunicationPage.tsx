import { Helmet } from 'react-helmet-async';
import { Container, Stack, Typography } from '@mui/material';
import Communication from '../../../sections/organizers/communication';

const CommunityCommunicationPage = () => {
  return (
    <>
      <Helmet>
        <title>Events</title>
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

export default CommunityCommunicationPage;