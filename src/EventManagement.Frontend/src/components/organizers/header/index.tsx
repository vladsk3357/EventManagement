// @mui
import { styled } from '@mui/material/styles';
import { Box, Stack, AppBar, Toolbar, IconButton, Typography } from '@mui/material';
// utils
import { bgBlur } from '../../../utils/cssStyles';
// components
import Iconify from '../../iconify';
//
import AccountPopover from './AccountPopover';
import { MouseEventHandler } from 'react';
import ShowOnEventsButton from './ShowOnEventsButton';
import CommunitiesDropdown from './CommunitiesDropdown';
import { Link } from 'react-router-dom';

// ----------------------------------------------------------------------

const NAV_WIDTH = 280;

const HEADER_MOBILE = 64;

const HEADER_DESKTOP = 92;

const StyledRoot = styled(AppBar)(({ theme }) => {
  return {
    ...bgBlur({ color: theme.palette.background.default }),
    boxShadow: 'none',
    [theme.breakpoints.up('lg')]: {
      width: `calc(100% - ${NAV_WIDTH + 1}px)`,
    }
  }
});

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  minHeight: HEADER_MOBILE,
  [theme.breakpoints.up('lg')]: {
    minHeight: HEADER_DESKTOP,
    padding: theme.spacing(0, 5),
  },
}));

// ----------------------------------------------------------------------

type Props = {
  onOpenNav?: MouseEventHandler<HTMLButtonElement>;
}

export default function Header({ onOpenNav }: Props) {
  return (
    <StyledRoot>
      <StyledToolbar>
        <IconButton
          onClick={onOpenNav}
          sx={{
            mr: 1,
            color: 'text.primary',
            display: { lg: 'none' },
          }}
        >
          <Iconify icon="eva:menu-2-fill" />
        </IconButton>
        <Stack direction="row" spacing={3}>
          <Link to="/"><Typography variant='h3'>Events</Typography></Link>
          <CommunitiesDropdown />
        </Stack>
        <Box sx={{ flexGrow: 1 }} />
        <Stack
          direction="row"
          alignItems="center"
          spacing={{
            xs: 1,
            sm: 3,
          }}
        >
          <Box sx={{
            display: {
              lg: 'block',
              xs: 'none'
            }
          }}>
            <ShowOnEventsButton />
          </Box>
          <AccountPopover />
        </Stack>
      </StyledToolbar>
    </StyledRoot >
  );
}
