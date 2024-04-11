import { Container, Stack, Typography, Box } from "@mui/material";
import { Helmet } from "react-helmet-async";
import Dashboard from "../../../sections/organizers/dashboard";

const CommunityDashboardPage = () => {

  return (
    <>
      <Helmet>
        <title>Дашборд | Events</title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Дашборд
          </Typography>
        </Stack>
        <Dashboard />
      </Container>
    </>
  );
};

export default CommunityDashboardPage;