import { Button } from "@mui/material";
import { Link, useParams } from "react-router-dom";

const CreateEventButton = () => {
  const { communityId } = useParams();

  return (
    <Link to={`/organizers/${communityId}/events/create`}>Створити подію</Link>
  );
};

export default CreateEventButton;
