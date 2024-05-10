import { useState } from "react";
import CommunityNav from "./communityNav";
import BaseLayout from "../base";
import Header from "../../components/organizers/header";
import { Outlet, useParams } from "react-router-dom";
import { styled } from "@mui/material";
import EventNav from "./eventNav";

const APP_BAR_MOBILE = 64;
const APP_BAR_DESKTOP = 92;

const StyledRoot = styled('div')({
  display: 'flex',
  minHeight: '100%',
  overflow: 'hidden',
});

const Main = styled('div')(({ theme }) => ({
  flexGrow: 1,
  overflow: 'auto',
  minHeight: '100%',
  paddingTop: APP_BAR_MOBILE + 24,
  paddingBottom: theme.spacing(10),
  [theme.breakpoints.up('lg')]: {
    paddingTop: APP_BAR_DESKTOP + 24,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
}));

const OrganizersLayout = () => {
  const [open, setOpen] = useState(false);
  const { eventId } = useParams();

  return (
    <BaseLayout>
      <StyledRoot>
        <Header showCommunitiesDropdown={!eventId} onOpenNav={() => setOpen(true)} />
        {eventId ? (
          <EventNav openNav={open} onCloseNav={() => setOpen(false)} />) : (
          <CommunityNav openNav={open} onCloseNav={() => setOpen(false)} />
        )}
        <Main>
          <Outlet />
        </Main>
      </StyledRoot>
    </BaseLayout>
  );
};

export default OrganizersLayout;