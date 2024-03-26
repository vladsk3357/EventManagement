import { Container, Stack, Typography } from "@mui/material";
import { Helmet } from "react-helmet-async";
import { EditProfileForm } from "../../sections/edit/profile";

const EditProfilePage = () => {
  return (
    <>
      <Helmet>
        <title>Інформація | Events</title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Інформація
          </Typography>
        </Stack>
        <EditProfileForm />
      </Container>
    </>
  );
};

export default EditProfilePage;
