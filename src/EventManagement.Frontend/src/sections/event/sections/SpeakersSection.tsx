import { Box, Typography, Grid, Card, CardContent } from "@mui/material";
import { Speaker } from "../types";

type Props = {
  speakers: Speaker[];
}

const SpeakersSection = ({ speakers }: Props) => {
  return (
    <Box mb={5}>
      <Typography id="speakers" variant="h3" gutterBottom>Спікери</Typography>
      <Grid container spacing={2}>
        {speakers.map(speaker => (
          <Grid key={speaker.id} item xs={12} sm={6}>
            <Card>
              <CardContent>
                <Typography variant="subtitle1" gutterBottom>{speaker.name}</Typography>
                <Typography variant="body2">{speaker.title}, {speaker.company}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default SpeakersSection;
