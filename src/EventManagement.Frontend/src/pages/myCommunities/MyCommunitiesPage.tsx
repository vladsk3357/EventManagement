import { Container, Stack, Typography } from "@mui/material";
import { Helmet } from "react-helmet-async";
import { MyCommunitiesList } from "../../sections/myCommunities";

const MyCommunitiesPage = () => {
  return (
    <>
      <Helmet>
        <title>Мої спільноти | Events</title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Мої спільноти
          </Typography>
        </Stack>
        <MyCommunitiesList />
      </Container>
    </>
  );
};

export default MyCommunitiesPage;
