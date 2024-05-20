import { Box, Typography, Grid, Card, CardContent, Accordion, AccordionSummary, Stack, AccordionDetails } from "@mui/material";
import { Speaker } from "../types";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

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
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
              >
                <Stack spacing={0}>
                  <Typography variant="subtitle1" gutterBottom>{speaker.name}</Typography>
                  <Typography variant="body2">{speaker.title}, {speaker.company}</Typography>
                </Stack>
              </AccordionSummary>
              <AccordionDetails>
                {speaker.bio}
              </AccordionDetails>
            </Accordion>
          </Grid>
        ))}
      </Grid>
    </Box >
  );
};

export default SpeakersSection;
