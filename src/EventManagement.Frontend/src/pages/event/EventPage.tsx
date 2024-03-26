import { Helmet } from 'react-helmet-async';
// @mui
import { Avatar, Box, Button, Container, Grid, Stack, Typography, Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { EventDetails } from '../../sections/event';


// ----------------------------------------------------------------------

const EventPage = () => {
  return (
    <>
      <Helmet>
        <title>Подія | Events</title>
      </Helmet>

      <EventDetails />
    </>
  );
};

export default EventPage;
