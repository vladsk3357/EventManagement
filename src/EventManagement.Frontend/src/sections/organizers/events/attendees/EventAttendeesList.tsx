import { SyntheticEvent, useMemo, useState } from "react";
import { TabContext, TabList } from "@mui/lab";
import { Box, Tab } from "@mui/material";
import AttendeesListPanel from "./attendeesListPanel";
import { Route, Routes, useParams, useNavigate, useLocation } from "react-router-dom";
import WaitingListPanel from "./waitingListPanel/WaitingListPanel";

const getUrls = (communityId: string, eventId: string) => [
  `/organizers/${communityId}/events/${eventId}/attendees/`,
  `/organizers/${communityId}/events/${eventId}/attendees/waiting-list`,
]

const EventAttendeesList = () => {
  const location = useLocation()
  const [tabIndex, setTabIndex] = useState(location.pathname.endsWith('waiting-list') ? '1' : '0');
  const { communityId, eventId } = useParams();

  const urls = useMemo(() => getUrls(communityId!, eventId!), [communityId, eventId]);

  const navigate = useNavigate();
  const handleChange = (event: SyntheticEvent, newTabIndex: string) => {
    setTabIndex(newTabIndex);
    navigate(urls[Number(newTabIndex)])
  };

  return (
    <Box>
      <TabContext value={tabIndex}>
        <TabList onChange={handleChange}>
          <Tab label="Учасники" value="0" />
          <Tab label="Список очікування" value="1" />
        </TabList>
        <Routes>
          <Route path="" element={<AttendeesListPanel value="0" />} />
          <Route path="waiting-list" element={<WaitingListPanel value="1" />} />
        </Routes>
      </TabContext>
    </Box>
  );
};

export default EventAttendeesList;
