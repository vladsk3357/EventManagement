import { Card, CardActionArea, CardContent, Stack, Typography, Alert, Box } from "@mui/material";
import { Event } from "./types";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { Link } from "react-router-dom";
import { formatAsTime } from "../../utils/dateFormatters";

type Props = {
  event: Event;
}

const EventCard = ({ event }: Props) => {
  return (
    <Card sx={{ mb: 2 }}>
      <Link to={`/community/${event.community.id}/${event.id}`}>
        <CardActionArea>
          <CardContent>
            <Typography variant="h5">{event.name}</Typography>
            <Stack direction="row" spacing={2} mb={2}>
              <Typography variant="subtitle2">{formatAsTime(event.startDate)}</Typography>
              <Typography variant="subtitle2">Від {event.community.name}</Typography>
            </Stack>
            <Box mb={2}>
              <Typography variant="subtitle2" gutterBottom sx={{ verticalAlign: 'middle' }}><LocationOnIcon /> {event.venue.type === 'Online' ? 'Онлайн' : event.venue.address.locationName}</Typography>
              <Typography variant="body1">{event.attendeesCount} учасників йде</Typography>
            </Box>
            {event.isCancelled && (
              <Alert severity="error">
                Ця подія була скасована
              </Alert>
            )}
          </CardContent>
        </CardActionArea>
      </Link>
    </Card>
  );
};

export default EventCard;
