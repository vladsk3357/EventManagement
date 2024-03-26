import { Helmet } from 'react-helmet-async';
// @mui
import { Container, Stack, Typography } from '@mui/material';
import { SubscribersList } from '../../../sections/organizers/subscribers';

const SubscribersPage = () => {
  return (
    <>
      <Helmet>
        <title>Учасники | Events</title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Учасники
          </Typography>
        </Stack>
        <SubscribersList />
      </Container>
    </>
  );
};

export default SubscribersPage;