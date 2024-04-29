import { Card, CardContent, Typography, CardActions, Button, CardActionArea, Grid, CardMedia, Stack } from "@mui/material";
import { Link as RouterLink } from 'react-router-dom';
import { Community } from "./types";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ExtensionIcon from '@mui/icons-material/Extension';
import PeopleIcon from '@mui/icons-material/People';

type Props = {
  community: Community;
};

const CommunityCard = ({ community }: Props) => {
  return (
    <Card sx={{ height: '100%' }}>
      <RouterLink to={`/community/${community.id}`}>
        <CardActionArea sx={{ minHeight: 200 }}>
          <CardMedia
            sx={{ height: 140 }}
            image={community.communityImageUrl || "https://via.placeholder.com/1"}
            title="community image"
          />
          <CardContent>
            <Grid container>
              <Grid item xs={12}>
                <Typography gutterBottom variant="h5" component="div">
                  {community.name}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Stack direction="row" spacing={2}>
                  <Typography variant="body2" color="text.secondary">
                    <LocationOnIcon /> {community.location}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <ExtensionIcon /> {community.domain}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <PeopleIcon /> {community.subscribersCount}
                  </Typography>
                </Stack>
              </Grid>
            </Grid>
          </CardContent>
        </CardActionArea>
      </RouterLink>
    </Card>
  );
};

export default CommunityCard;
