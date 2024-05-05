import { Card, CardContent, Typography, CardActions, Button, CardActionArea, Grid } from "@mui/material";
import { Link as RouterLink } from 'react-router-dom';
import { Community } from "./types";

type Props = {
  community: Community;
};

const CommunityCard = ({ community }: Props) => {
  return (
    <Card>
      <RouterLink to={`/community/${community.id}`}>
        <CardActionArea sx={{ minHeight: 200 }}>
          {/* <CardMedia
        sx={{ height: 140 }}
        image="/static/images/cards/contemplative-reptile.jpg"
        title="green iguana"
      /> */}
          <CardContent>
            <Grid container>
              <Grid item xs={12}>
                <Typography gutterBottom variant="h5" component="div">
                  {community.name}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2" color="text.secondary">
                  {community.subscribersCount} учасників
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </CardActionArea>
      </RouterLink>
    </Card>
  );
};

export default CommunityCard;
