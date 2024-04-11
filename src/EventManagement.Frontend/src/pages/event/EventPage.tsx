import { Helmet } from 'react-helmet-async';
import { EventDetails } from '../../sections/event';

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
