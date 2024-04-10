import { Helmet } from 'react-helmet-async';
import { Container } from '@mui/material';
import UserDetails from '../sections/profile/userDetails';

const UserDetailsPage = () => {
  return (
    <>
      <Helmet>
        <title>Профіль | Events</title>
      </Helmet>
      <Container>
        <UserDetails />
      </Container>
    </>
  );
};

export default UserDetailsPage;
