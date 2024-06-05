import { TabContext, TabList } from "@mui/lab";
import { Box, Tab } from "@mui/material";
import { useState, SyntheticEvent } from "react";
import EmailsInvitationPanel from "./EmailsInvitationPanel";

const Invitation = () => {
  const [tabIndex, setTabIndex] = useState('1');
  const handleChange = (event: SyntheticEvent, newTabIndex: string) => {
    setTabIndex(newTabIndex);
  };

  return (
    <Box>
      <TabContext value={tabIndex}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange}>
            <Tab label="Електронні пошти" value="1" />
          </TabList>
        </Box>
        <EmailsInvitationPanel value="1" />
      </TabContext>
    </Box>
  );
};

export default Invitation;
