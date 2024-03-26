import { Button } from "@mui/material";
import { useParams, Link as RouterLink } from "react-router-dom";


const ShowOnEventsButton = () => {
  const { communityId } = useParams();

  return (
    <RouterLink to={`/community/${communityId}`} target="_blank" >
      <Button variant='outlined'>Показати на Events</Button>
    </RouterLink>
  );
};

export default ShowOnEventsButton;
