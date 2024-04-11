import { Typography, Box } from "@mui/material";

type Props = {
  description: string;
}

const DescriptionSection = ({ description }: Props) => {
  return (
    <Box mb={5}>
      <Typography id="description" variant="h3" gutterBottom>Опис</Typography>
      {description && <div dangerouslySetInnerHTML={{ __html: description }}></div>}
    </Box>
  );
};

export default DescriptionSection;
