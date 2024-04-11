import { Button, Card, CardActions, CardContent, CircularProgress, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useSubscribersList } from "../common";
import PeopleIcon from '@mui/icons-material/People';

type Props = {
  communityId: number;
}

const SubscribersSection = ({ communityId }: Props) => {
  const { data, isLoading, isFetched } = useSubscribersList(communityId, 1, 5);

  return (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Stack direction="row" alignItems="center" spacing={1} mb={2}>
          <PeopleIcon />
          <Typography variant="h4" gutterBottom>Учасники</Typography>
        </Stack>
        {isLoading && <CircularProgress />}
        {isFetched && data && (
          <Typography variant="body1" gutterBottom>{data.totalCount} учасники</Typography>
        )}
        <CardActions sx={{ justifyContent: 'end' }}>
          <Link to={`/organizers/${communityId}/members`}>
            <Button endIcon={<ArrowForwardIcon />}>Переглянути всі</Button>
          </Link>
        </CardActions>
      </CardContent>
    </Card>
  );
};

export default SubscribersSection;
