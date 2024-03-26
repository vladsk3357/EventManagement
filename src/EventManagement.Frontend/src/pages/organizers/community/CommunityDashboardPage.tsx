import { Container, Stack, Typography } from "@mui/material";
import { Helmet } from "react-helmet-async";

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
      </Container>
    </>
  );
};

export default CommunityDashboardPage;