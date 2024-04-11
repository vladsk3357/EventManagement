import { Card, CardActionArea, CardContent, Typography } from "@mui/material";
import { Link as RouterLink } from 'react-router-dom';

const CreateCommunityCard = () => {
  return (
    <Card>
      <RouterLink to="/organizers/create">
        <CardActionArea sx={{ minHeight: 200 }}>
          {/* <CardMedia
        sx={{ height: 140 }}
        image="/static/images/cards/contemplative-reptile.jpg"
        title="green iguana"
      /> */}
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              + Створити нову спільноту
            </Typography>
            <Typography variant="body2" color="text.secondary">
              і об'єднати людей
            </Typography>
          </CardContent>
        </CardActionArea>
      </RouterLink>
    </Card>
  );
};

export default CreateCommunityCard;
