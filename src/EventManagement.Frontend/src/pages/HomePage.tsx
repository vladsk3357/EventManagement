import { Helmet } from 'react-helmet-async';
// @mui
import { Container, Stack, Typography } from '@mui/material';

// ----------------------------------------------------------------------

const HomePage = () => {
  return (
    <>
      <Helmet>
        <title>Головна | Events</title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Що нового
          </Typography>
        </Stack>
      </Container>
    </>
  );
};

export default HomePage;
