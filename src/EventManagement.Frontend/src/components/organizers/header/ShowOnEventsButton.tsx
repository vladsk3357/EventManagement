import { Button } from "@mui/material";
import { useParams, Link as RouterLink } from "react-router-dom";


const ShowOnEventsButton = () => {
  const { communityId, eventId } = useParams();

  if (!communityId)
    return null;

  return (
    <RouterLink to={`/community/${communityId}${eventId ? `/${eventId}` : ''}`} target="_blank" >
      <Button variant='outlined'>Показати на Events</Button>
    </RouterLink>
  );
};

export default ShowOnEventsButton;
