import { Stack, Button, IconButton } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import SettingsIcon from '@mui/icons-material/Settings';

type Props = {
  communityId: number;
};

const CommunityOrganizerButtons = ({ communityId }: Props) => {
  return (
    <Stack direction="row" gap={1}>
      <RouterLink to={`/organizers/${communityId}/events/create`}>
        <Button variant='contained'>Створити подію</Button>
      </RouterLink>
      <RouterLink to={`/organizers/${communityId}/dashboard`}>
        <IconButton>
          <SettingsIcon />
        </IconButton>
      </RouterLink>
    </Stack>
  );
};

export default CommunityOrganizerButtons;
