import { TabPanel } from "@mui/lab";
import { Box, Typography } from "@mui/material";

type Props = {
  value: string;
  description: string | undefined | null;
}

const DescriptionTabPanel = ({ value, description }: Props) => {
  return (
    <TabPanel value={value}>
      <Box>
        <Typography variant="h6" gutterBottom>Опис</Typography>
        {description}
      </Box>
    </TabPanel>
  );
};

export default DescriptionTabPanel;
