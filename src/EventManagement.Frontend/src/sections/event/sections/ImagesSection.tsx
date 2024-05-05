import { Stack, Card } from "@mui/material";

type Props = {
  imagesUrls: string[];
};

const ImagesSection = ({ imagesUrls }: Props) => {
  return (
    <Stack spacing={2} pb={5}>
      {imagesUrls.map((imageUrl, i) => (
        <Card key={i}>
          <img src={imageUrl} alt="event image" />
        </Card>
      ))}
    </Stack>
  );
};


export default ImagesSection;