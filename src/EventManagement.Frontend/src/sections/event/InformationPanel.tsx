import { Box, Paper, Stack, Typography, Link } from "@mui/material";
import { AttendeeStatus, Venue } from "./types";
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import moment from "moment";
import AttendEventButton from "./AttendEventButton";
import UnattendEventButton from "./UnattendEventButton";

type Props = {
  startDate: moment.Moment;
  endDate: moment.Moment;
  attendeeStatus: AttendeeStatus | null;
  attendanceCountLeft: number | null;
  venue: Venue;
  eventId: number;
  isOrganizer: boolean;
  isAttendable: boolean;
}

const InformationPanel = ({
  attendanceCountLeft,
  attendeeStatus,
  endDate,
  venue,
  startDate,
  eventId,
  isOrganizer,
  isAttendable,
}: Props) => {


  let attendanceButton;
  switch (attendeeStatus) {
    case AttendeeStatus.Confirmed:
      attendanceButton = <UnattendEventButton eventId={eventId} />;
      break;
    case AttendeeStatus.Pending:
      attendanceButton = <UnattendEventButton eventId={eventId} />;
      break;
    default:
      attendanceButton = <AttendEventButton eventId={eventId} isOrganizer={isOrganizer} />;
  }

  return (
    <Box component={Paper} bgcolor="Background" mb={3}>
      <Stack direction="column" spacing={3} p={2} color="InfoText">
        <Stack direction="column" spacing={2}>
          <Box>
            <Typography variant="caption"><AccessTimeIcon /></Typography><br />
            <Typography variant="caption">ДАТА ПОЧАТКУ</Typography>
            <Typography variant="subtitle2">{startDate.format("LL")}</Typography>
            <Typography variant="caption">{startDate.format("kk:mm")}</Typography>
          </Box>
          <Box>
            <Typography variant="caption">ДАТА ЗАВЕРШЕННЯ</Typography>
            <Typography variant="subtitle2">{endDate.format("LL")}</Typography>
            <Typography variant="caption">{endDate.format("kk:mm")}</Typography>
          </Box>
        </Stack>
        <Box>
          <Typography variant="caption"><LocationOnIcon /></Typography><br />
          {venue.type === 'Online' ? (
            <>
              <Typography variant="subtitle2">Онлайн</Typography>
              {attendeeStatus !== null && (
                <Link target="_blank" href={venue.url}><Typography variant="caption">Перейти до адреси події</Typography></Link>
              )}
            </>
          ) : (
            <>
              <Typography variant="subtitle2">{venue.address.locationName}, {venue.address.street}, {venue.address.city}</Typography>
            </>
          )}
        </Box>
        {isAttendable &&
          <Box>
            <Typography variant="caption"><HelpOutlineIcon /></Typography><br />
            {attendeeStatus === null && (
              <>
                <Typography variant="subtitle2">Ви йдете?</Typography>
                <Typography variant="caption">{attendanceCountLeft ? `${attendanceCountLeft} місць залишилося` : 'Немає ліміту відвідувачів'}</Typography>
              </>
            )}
            {attendeeStatus === AttendeeStatus.Pending && (
              <>
                <Typography variant="subtitle2">Ви в листі очікування</Typography>
                <Typography variant="caption">{attendanceCountLeft ? `${attendanceCountLeft} місць залишилося` : 'Немає ліміту відвідувачів'}</Typography>
              </>
            )}
            {attendeeStatus === AttendeeStatus.Confirmed && (
              <>
                <Typography variant="subtitle2">Ви йдете!</Typography>
                <Typography variant="caption">{attendanceCountLeft ? `${attendanceCountLeft} місць залишилося` : 'Немає ліміту відвідувачів'}</Typography>
              </>
            )}
          </Box>
        }
        {isAttendable &&
          <Box>
            {attendanceButton}
          </Box>
        }
      </Stack>
    </Box>
  );
};

export default InformationPanel;
