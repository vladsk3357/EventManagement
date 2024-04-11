import { Container, Stack, Typography } from "@mui/material";
import { Helmet } from "react-helmet-async";
import { CommunitySubscriptionForm } from "../../../sections/organizers/сommunitySubscriptionForm";

const CommunitySubscriptionFormPage = () => {
  return (
    <>
      <Helmet>
        <title>Реєстраційна форма | Events</title>
      </Helmet>

      <Container>
        <CommunitySubscriptionForm />
      </Container>
    </>
  );
};

export default CommunitySubscriptionFormPage;
