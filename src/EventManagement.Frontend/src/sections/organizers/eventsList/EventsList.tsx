import { useParams, useNavigate, Route, Routes, useLocation } from "react-router-dom";
import { Tab } from "@mui/material";
import { Box } from "@mui/material";
import { TabContext, TabList } from "@mui/lab";
import { useState, useMemo, SyntheticEvent } from "react";
import FutureEventsListPanel from "./FutureEventsListPanel";
import PastEventsListPanel from "./PastEventsListPanel";

const getUrls = (communityId: string) => [
  `/organizers/${communityId}/events/list/`,
  `/organizers/${communityId}/events/list/past`,
]

const EventsList = () => {
  const location = useLocation()
  const [tabIndex, setTabIndex] = useState(location.pathname.endsWith('past') ? '1' : '0');
  const { communityId } = useParams();

  const urls = useMemo(() => getUrls(communityId!), [communityId]);

  const navigate = useNavigate();
  const handleChange = (event: SyntheticEvent, newTabIndex: string) => {
    setTabIndex(newTabIndex);
    navigate(urls[Number(newTabIndex)])
  };

  return (
    <Box>
      <TabContext value={tabIndex}>
        <TabList onChange={handleChange}>
          <Tab label="Майбутні події" value="0" />
          <Tab label="Минулі події" value="1" />
        </TabList>
        <Routes>
          <Route path="" element={<FutureEventsListPanel value="0" />} />
          <Route path="past" element={<PastEventsListPanel value="1" />} />
        </Routes>
      </TabContext>
    </Box>
  );
};

export default EventsList;
