import { useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { Box, Drawer, Typography } from '@mui/material';
import useResponsive from '../../../hooks/useResponsive';
import Scrollbar from '../../../components/scrollbar';
import NavSection from '../../../components/nav-section';
import navConfig from './config';
import { useGetCommunityDetailsQuery } from '../../../sections/organizers/common';

const NAV_WIDTH = 280;

type Props = {
  openNav: boolean;
  onCloseNav: () => void;
};

const CommunityNav = ({ openNav, onCloseNav }: Props) => {
  const { pathname } = useLocation();
  const { communityId } = useParams();
  const { data, isFetched } = useGetCommunityDetailsQuery();

  const isDesktop = useResponsive('up', 'lg');

  useEffect(() => {
    if (openNav) {
      onCloseNav();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const renderContent = (
    <Scrollbar
      sx={{
        height: 1,
        '& .simplebar-content': { height: 1, display: 'flex', flexDirection: 'column' },
      }}
    >
      {isFetched && data && (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            px: 2,
            pt: 2,
          }}
        >
          <Box sx={{ mr: 1 }}>
            <Typography variant="subtitle1">
              {data.name}
            </Typography>
          </Box>
        </Box>
      )}
      <NavSection data={navConfig(communityId!)} />

      <Box sx={{ flexGrow: 1 }} />
    </Scrollbar>
  );

  return (
    <Box
      component="nav"
      sx={{
        flexShrink: { lg: 0 },
        width: { lg: NAV_WIDTH },
      }}
    >
      {isDesktop ? (
        <Drawer
          open
          variant="permanent"
          PaperProps={{
            sx: {
              width: NAV_WIDTH,
              bgcolor: 'background.neutral',
              borderRightStyle: 'solid',
            },
          }}
        >
          {renderContent}
        </Drawer>
      ) : (
        <Drawer
          open={openNav}
          onClose={onCloseNav}
          ModalProps={{
            keepMounted: true,
          }}
          PaperProps={{
            sx: { width: NAV_WIDTH },
          }}
        >
          {renderContent}
        </Drawer>
      )}
    </Box>
  );
};

export default CommunityNav;
