import { Card, CardActionArea, CardContent, Typography, CardMedia } from "@mui/material";
import { Link as RouterLink } from 'react-router-dom';

const CreateCommunityCard = () => {
  return (
    <Card>
      <RouterLink to="/organizers/create">
        <CardActionArea sx={{ minHeight: 200 }}>
          <CardMedia
            sx={{ height: 140 }}
            image={undefined}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              + Створити нову спільноту
            </Typography>
          </CardContent>
        </CardActionArea>
      </RouterLink>
    </Card>
  );
};

export default CreateCommunityCard;
