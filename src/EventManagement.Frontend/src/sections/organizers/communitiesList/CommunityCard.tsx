import { Card, CardContent, Typography, CardActions, Button, CardActionArea, CardMedia } from "@mui/material";
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
          <CardMedia
            sx={{ height: 140 }}
            image={community.communityImageUrl || undefined}
            title="community image"
          />
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
