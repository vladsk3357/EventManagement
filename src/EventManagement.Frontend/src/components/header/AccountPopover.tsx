import { MouseEventHandler, useContext, useState } from 'react';
// @mui
import { alpha } from '@mui/material/styles';
import { Box, Divider, Typography, Stack, MenuItem, Avatar, IconButton, Popover, Link } from '@mui/material';
import { UserContext } from '../user';
import { Link as RouterLink } from 'react-router-dom';
// mocks_

// ----------------------------------------------------------------------

const MENU_OPTIONS = [
  {
    label: 'Профіль',
    icon: 'eva:person-fill',
  },

  {
    label: 'Вийти',
    icon: 'eva:settings-2-fill',
  },
];

// ----------------------------------------------------------------------

export default function AccountPopover() {
  const [open, setOpen] = useState<HTMLButtonElement | null>(null);
  const { user, remove } = useContext(UserContext);

  const handleOpen: MouseEventHandler<HTMLButtonElement> = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  return (
    <>
      <IconButton
        onClick={handleOpen}
        sx={{
          p: 0,
          ...(open && {
            '&:before': {
              zIndex: 1,
              content: "''",
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              position: 'absolute',
              bgcolor: (theme) => alpha(theme.palette.grey[900], 0.8),
            },
          }),
        }}
      >
        <Avatar alt="profile image" src={user?.profileImageUrl || undefined} />
      </IconButton>

      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        slotProps={{
          paper: {
            sx: {
              p: 0,
              mt: 1.5,
              ml: 0.75,
              width: 250,
              '& .MuiMenuItem-root': {
                typography: 'body2',
                borderRadius: 0.75,
              },
            },
          }
        }}
      >
        <Box sx={{ my: 1.5, px: 2.5 }}>
          <Typography variant="subtitle2" noWrap>
            {user?.name}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
            {user?.email}
          </Typography>
        </Box>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Stack sx={{ p: 1 }}>
          <Link component={RouterLink} to="/profile" variant="body2" sx={{ textDecoration: 'none', color: 'inherit' }}>
            <MenuItem>
              Профіль
            </MenuItem>
          </Link>
          <Link component={RouterLink} to="/organizers" variant="body2" sx={{ textDecoration: 'none', color: 'inherit' }}>
            <MenuItem>
              Мої спільноти
            </MenuItem>
          </Link>
          <MenuItem onClick={() => remove()}>
            <Typography variant='body2'>Вийти</Typography>
          </MenuItem>
        </Stack>
      </Popover>
    </>
  );
}
