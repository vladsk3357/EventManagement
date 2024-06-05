import { Box, Typography, Card, CardContent, Chip, Accordion, AccordionSummary, AccordionDetails, Stack, Grid } from "@mui/material";
import { Schedule } from "../types";
import { formatAsDateMonthYear, formatAsTime } from "../../../utils/dateFormatters";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const levels = new Map([
  ['Beginner', 'Початковий'],
  ['Intermediate', 'Середній'],
  ['Advanced', 'Професійний'],
  ['Expert', 'Експертний'],
]);

type Props = {
  schedules: Schedule[];
};

const SchedulesSection = ({ schedules }: Props) => {
  return (
    <Box mb={5}>
      <Typography id="schedule" variant="h3" gutterBottom>Програма</Typography>
      {schedules.map(schedule => (
        <Box key={schedule.date.toISOString(true)} mb={3}>
          <Typography variant="h5" gutterBottom>{formatAsDateMonthYear(schedule.date)}</Typography>
          <Grid container spacing={2}>
            {schedule.sessions.map(session => (
              <Grid key={session.id} item xs={12}>
                <Accordion key={session.id}>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                  >
                    <Stack spacing={0}>
                      <Typography variant="body2">{formatAsTime(session.startTime)} - {formatAsTime(session.endTime)}</Typography>
                      <Typography variant="subtitle1" gutterBottom>{session.title}</Typography>
                      <Typography variant="body2">{session.speakers.map(speaker => speaker.name).join(', ')}</Typography>
                      <Box my={1}>
                        <Chip label={levels.get(session.level)} color="info" variant="filled" size="small" />
                      </Box>
                    </Stack>
                  </AccordionSummary>
                  <AccordionDetails>
                    {session.description}
                  </AccordionDetails>
                </Accordion>
              </Grid>
            ))}
          </Grid>
        </Box>
      ))}
    </Box >
  );
};

export default SchedulesSection;
