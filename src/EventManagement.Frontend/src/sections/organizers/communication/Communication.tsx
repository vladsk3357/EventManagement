import { TabContext, TabList } from "@mui/lab";
import { Box, Tab } from "@mui/material";
import { useState, SyntheticEvent } from "react";
import CommunityCommunicationPanel from "./CommunityCommunicationPanel";
import EventCommunicationPanel from "./EventCommunicationPanel";

const Communication = () => {
  const [tabIndex, setTabIndex] = useState('1');
  const handleChange = (event: SyntheticEvent, newTabIndex: string) => {
    setTabIndex(newTabIndex);
  };

  return (
    <Box>
      <TabContext value={tabIndex}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange}>
            <Tab label="Лист учасникам спільноти" value="1" />
            <Tab label="Лист відвідувачам події" value="2" />
          </TabList>
        </Box>
        <CommunityCommunicationPanel value="1" />
        <EventCommunicationPanel value="2" />
      </TabContext>
    </Box>
  );
};

export default Communication;
