import { Card, CardActionArea, CardContent, Stack, Typography } from "@mui/material";
import { CommunityEvent } from "./types";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { Link } from "react-router-dom";


type Props = {
  event: CommunityEvent;
}

const EventCard = ({ event }: Props) => {
  return (
    <Card sx={{ height: '100%' }}>
      <Link to={`/community/${event.community.id}/${event.id}`}>
        <CardActionArea>
          <CardContent>
            <Typography variant="h5">{event.name}</Typography>
            <Stack direction="row" spacing={3} mb={2}>
              <Typography variant="subtitle2">{event.startDate.format("lll")}</Typography>
              <Typography variant="subtitle2">Від {event.community.name}</Typography>
            </Stack>
            <Typography variant="subtitle2" gutterBottom sx={{ verticalAlign: 'middle' }}><LocationOnIcon /> {event.venue.type === 'Online' ? 'Онлайн' : event.venue.address.locationName}</Typography>
            <Typography variant="body1">{event.attendeesCount} учасників йде</Typography>
          </CardContent>
        </CardActionArea>
      </Link>
    </Card>
  );
};

export default EventCard;
