import { Container, Stack, Typography } from "@mui/material";
import { Helmet } from "react-helmet-async";
import { CreateCommunityForm } from "../../../sections/organizers/create";

const CreateCommunityPage = () => {
  return (
    <>
      <Helmet>
        <title>Створити нову спільноту | Events</title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Створити спільноту
          </Typography>
        </Stack>
        <CreateCommunityForm />
      </Container>
    </>
  );
};

export default CreateCommunityPage;
