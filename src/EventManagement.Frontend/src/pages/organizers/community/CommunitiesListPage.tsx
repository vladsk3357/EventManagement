import { Helmet } from 'react-helmet-async';
// @mui
import { Container, Stack, Typography } from '@mui/material';
import CommunitiesList from '../../../sections/organizers/communitiesList';

// ----------------------------------------------------------------------

const CommunitiesListPage = () => {
  return (
    <>
      <Helmet>
        <title>Events</title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Оберіть спільноту
          </Typography>
        </Stack>
        <CommunitiesList />
      </Container>
    </>
  );
};

export default CommunitiesListPage;