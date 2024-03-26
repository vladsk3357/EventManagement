import { Card, CardContent, Typography, CardActions, Button, CardActionArea } from "@mui/material";
import { Link as RouterLink } from 'react-router-dom';
import { Community } from "./types";

type Props = {
  community: Community;
};

const CommunityCard = ({ community }: Props) => {
  return (
    <Card>
      <RouterLink to={`/organizers/${community.id}/dashboard`}>
        <CardActionArea sx={{ minHeight: 200 }}>
          {/* <CardMedia
        sx={{ height: 140 }}
        image="/static/images/cards/contemplative-reptile.jpg"
        title="green iguana"
      /> */}
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {community.name}
            </Typography>
          </CardContent>
        </CardActionArea>
      </RouterLink>
    </Card>
  );
};

export default CommunityCard;
