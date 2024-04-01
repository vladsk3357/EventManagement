import { TabContext, TabList } from "@mui/lab";
import { Box, Tab } from "@mui/material";
import { SyntheticEvent, useState } from "react";
import FormConstructorPanel from "./formConstructorPanel";
import AnswersPanel from "./answersPanel";

const CommunitySubscriptionForm = () => {
  const [tabIndex, setTabIndex] = useState('1');
  const handleChange = (event: SyntheticEvent, newTabIndex: string) => {
    setTabIndex(newTabIndex);
  };

  return (
    <Box>
      <TabContext value={tabIndex}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange}>
            <Tab label="Питання" value="1" />
            <Tab label="Відповіді" value="2" />
          </TabList>
        </Box>
        <FormConstructorPanel value="1" />
        <AnswersPanel value="2" />
      </TabContext>
    </Box>
  );
};

export default CommunitySubscriptionForm;
