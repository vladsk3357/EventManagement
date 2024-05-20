import { styled } from '@mui/material/styles';
import { Box, Stack, AppBar, Toolbar, IconButton, Typography } from '@mui/material';
import { bgBlur } from '../../utils/cssStyles';
import Iconify from '../iconify';
import AccountPopover from './AccountPopover';
import { MouseEventHandler } from 'react';
import CreatePopover from './CreatePopover';
import { Link } from 'react-router-dom';
import SearchBox from './SearchBox';

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
        <Box sx={{ mr: 2 }}>
          <Link to="/"><Typography variant='h3'>Events</Typography></Link>
        </Box>

        <SearchBox />
        <Box sx={{ flexGrow: 1, mx: 2 }} />
        <Stack
          direction="row"
          alignItems="center"
          spacing={{
            xs: 1,
            sm: 3,
          }}
        >
          <AccountPopover />
        </Stack>
      </StyledToolbar>
    </StyledRoot>
  );
}
