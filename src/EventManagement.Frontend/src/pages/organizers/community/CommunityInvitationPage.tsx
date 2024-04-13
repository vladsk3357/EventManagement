import { Container, Stack, Typography } from "@mui/material";
import { Helmet } from "react-helmet-async";
import Invitation from "../../../sections/organizers/invitation";

const CommunityInvitationPage = () => {

  return (
    <>
      <Helmet>
        <title>Запросити | Events</title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Запросити
          </Typography>
        </Stack>
        <Invitation />
      </Container>
    </>
  );
};

export default CommunityInvitationPage;