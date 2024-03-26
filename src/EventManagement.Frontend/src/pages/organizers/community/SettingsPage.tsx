import { Helmet } from 'react-helmet-async';
// @mui
import { Container, Stack, Typography } from '@mui/material';
import { SettingsForm } from '../../../sections/organizers/settings';

const SettingsPage = () => {
  return (
    <>
      <Helmet>
        <title>Налаштування | Events</title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Налаштування
          </Typography>
        </Stack>
        <SettingsForm />
      </Container>
    </>
  );
};

export default SettingsPage;