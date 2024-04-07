import { Box, Typography, Card, CardContent } from "@mui/material";
import { Schedule } from "../types";

type Props = {
  schedules: Schedule[];
};

const SchedulesSection = ({ schedules }: Props) => {
  return (
    <Box mb={5}>
      <Typography id="schedule" variant="h3" gutterBottom>Програма</Typography>
      {schedules.map(schedule => (
        <Box key={schedule.date.toISOString(true)} mb={3}>
          <Typography variant="h5" gutterBottom>{schedule.date.format("LL")}</Typography>
          {schedule.sessions.map(session => (
            <Card key={session.id} sx={{ mb: 2 }}>
              <CardContent>
                <Typography variant="body2">{session.startTime.format("LT")} - {session.endTime.format("LT")}</Typography>
                <Typography variant="subtitle1" gutterBottom>{session.title}</Typography>
                <Typography variant="body2">{session.speakers.map(speaker => speaker.name).join(', ')}</Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      ))}
    </Box>
  );
};

export default SchedulesSection;
