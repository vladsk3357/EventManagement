import { Helmet } from 'react-helmet-async';
// @mui
import { Avatar, Box, Button, Container, Grid, Stack, Typography, Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import Iconify from '../components/iconify';
import { useQuery } from '@tanstack/react-query';
import { axios } from '../api';


// ----------------------------------------------------------------------

const UserDetailsPage = () => {
  const { data } = useQuery({
    queryKey: ['user'],
    queryFn: () => axios.get<UserDetailsQueryResultType>('/api/profileinfo').then(res => res.data)
  });

  return (
    <>
      <Helmet>
        <title>Профіль | Events</title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Avatar alt="photoURL" sx={{ width: 120, height: 120, mr: 2 }} />

          <Grid container>
            <Grid item xs={6}>
              <Stack direction="row" sx={{ pt: 1, mb: 3 }}>
                <Typography variant="h4">
                  {data?.name}
                </Typography>
                <Typography variant="h6" sx={{ ml: 2 }}>
                  @{data?.userName}
                </Typography>
              </Stack>
              <Stack direction="row">
                <Iconify icon="mdi:location" />
                <Typography variant="body2" sx={{ mr: 2 }}>
                  {data?.location || 'Не вказано'}
                </Typography>
              </Stack>
            </Grid>
            <Grid item xs={6} sx={{ textAlign: 'right' }}>
              <Box mb={3}>
                <Button component={RouterLink} to="/edit/profile" variant='outlined'>Редагувати профіль</Button>
              </Box>
              {/* <Box>
                <Stack direction="row" justifyContent="end">
                  <Link component={RouterLink} to="/profile">
                    <Typography variant="body1" align='center'>Оновлення</Typography>
                    <Typography variant="body2" align='center'>6</Typography>
                  </Link>
                  <Link component={RouterLink} to="/profile/following" ml={2}>
                    <Typography variant="body1" align='center'>Відстежує</Typography>
                    <Typography variant="body2" align='center'>0</Typography>
                  </Link>
                  <Link component={RouterLink} to="/profile/followers" ml={2}>
                    <Typography variant="body1" align='center'>Підписники</Typography>
                    <Typography variant="body2" align='center'>0</Typography>
                  </Link>
                </Stack>
              </Box> */}
            </Grid>
          </Grid>
        </Stack>
      </Container>
    </>
  );
};

export default UserDetailsPage;

type UserDetailsQueryResultType = {
  id: string;
  email: string;
  phoneNumber: string | null;
  name: string;
  userName: string;
  birthday: string | null;
  location: string | null;
  information: string | null;
};
