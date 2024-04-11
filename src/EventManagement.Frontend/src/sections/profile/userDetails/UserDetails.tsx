import { Stack, Avatar, Grid, Typography, Box, Button, CircularProgress } from "@mui/material";
import { Link as RouterLink } from 'react-router-dom';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { useQuery } from '@tanstack/react-query';
import { axios } from '../../../api';

const UserDetails = () => {
  const { data, isLoading, isFetched } = useGetProfileQuery();

  return (
    <>
      {isLoading && <CircularProgress />}
      {isFetched && data && (
        <Box>
          <Grid container spacing={3} mb={3}>
            <Grid item xs={12} md={8}>
              <Stack direction="row" alignItems="center" justifyContent="space-between">
                <Avatar alt="photoURL" sx={{ width: 120, height: 120, mr: 2 }} />
                <Stack direction="column" spacing={2}>
                  <Typography variant="h2">
                    {data.name}
                  </Typography>
                  <Stack direction="row" spacing={2}>
                    <Typography variant="subtitle1">
                      @{data.userName}
                    </Typography>
                    <Stack direction="row">
                      <LocationOnIcon />
                      <Typography variant="body1">
                        {data.location || 'Не вказано'}
                      </Typography>
                    </Stack>
                  </Stack>
                </Stack>
              </Stack>
            </Grid>
            <Grid item xs={12} md={4} sx={{ textAlign: 'right' }}>
              <Button
                component={RouterLink}
                to="/edit/profile"
                variant='outlined'
                size="large"
                fullWidth
              >
                Редагувати профіль
              </Button>
            </Grid>
          </Grid>
          <Box>
            <Typography variant="h5">
              Про мене
            </Typography>
            <Typography variant="body1">
              {data.information || 'Не вказано'}
            </Typography>
          </Box>
        </Box>
      )}
    </>
  );
};

export default UserDetails;

type UserDetailsQueryResultType = {
  id: string;
  email: string;
  name: string;
  userName: string;
  location: string | null;
  information: string | null;
};

function useGetProfileQuery() {
  return useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      const res = await axios.get<UserDetailsQueryResultType>('/api/profileinfo');
      return res.data;
    },
  });
}
