import { TabContext, TabList } from "@mui/lab";
import { Box, Tab } from "@mui/material";
import { useState, SyntheticEvent } from "react";
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
            <Tab label="Лист відвідувачам події" value="1" />
          </TabList>
        </Box>
        <EventCommunicationPanel value="1" />
      </TabContext>
    </Box>
  );
};

export default Communication;
