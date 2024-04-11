import { Button, Card, CardActionArea, CardActions, CardContent, CircularProgress, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useEventsList } from "../common";
import EventIcon from '@mui/icons-material/Event';
import moment from "moment";

type Props = {
  communityId: number;
}

const FutureEventsSection = ({ communityId }: Props) => {
  const { data, isLoading, isFetched } = useEventsList(communityId, 1, 5);

  return (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Stack direction="row" alignItems="center" spacing={1} mb={2}>
          <EventIcon />
          <Typography variant="h4" gutterBottom>Майбутні події</Typography>
        </Stack>
        {isLoading && <CircularProgress />}
        <Stack direction="column" spacing={2} mb={2}>
          {isFetched && data && data.items.map(event => (
            <Card key={event.id}>
              <Link to={`/organizers/${communityId}/events/${event.id}/details`}>
                <CardActionArea>
                  <CardContent>
                    <Typography variant="h6">{event.name}</Typography>
                    <Typography variant="body2">{event.attendeesCount} учасників йде</Typography>
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <EventIcon />
                      <Typography variant="body2">{moment(event.startDate).format("LL")}</Typography>
                    </Stack>
                  </CardContent>
                </CardActionArea>
              </Link>
            </Card>
          ))}
        </Stack>
        <CardActions sx={{ justifyContent: 'end' }}>
          <Link to={`/organizers/${communityId}/events/list`}>
            <Button endIcon={<ArrowForwardIcon />}>Переглянути всі</Button>
          </Link>
        </CardActions>
      </CardContent>
    </Card>
  );
};

export default FutureEventsSection;
