import { Helmet } from 'react-helmet-async';
// @mui
import { Avatar, Box, Button, Container, Grid, Stack, Typography, Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { CommunityDetails } from '../../sections/community';


// ----------------------------------------------------------------------

const CommunityPage = () => {
  return (
    <>
      <Helmet>
        <title>Спільнота | Events</title>
      </Helmet>

      <CommunityDetails />
    </>
  );
};

export default CommunityPage;
