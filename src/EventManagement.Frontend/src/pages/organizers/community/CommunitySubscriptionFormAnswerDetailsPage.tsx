import { Container } from "@mui/material";
import { Helmet } from "react-helmet-async";
import { AnswerDetails } from "../../../sections/organizers/сommunitySubscriptionForm";

const CommunitySubscriptionFormAnswerDetailsPage = () => {
  return (
    <>
      <Helmet>
        <title>Відповідь | Events</title>
      </Helmet>

      <Container>
        <AnswerDetails />
      </Container>
    </>
  );
};

export default CommunitySubscriptionFormAnswerDetailsPage;
