import { MouseEventHandler, useContext, useState } from 'react';
// @mui
import { alpha } from '@mui/material/styles';
import { Box, Divider, Typography, Stack, MenuItem, Avatar, IconButton, Popover, Link, Button, Menu } from '@mui/material';
import { UserContext } from '../user';
import { Link as RouterLink } from 'react-router-dom';

// ----------------------------------------------------------------------

export default function CreatePopover() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Button
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        variant="contained"
      >
        Створити
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        sx={{
          mt: 1.5,
          ml: 0.75,
        }}
      >
        <Link component={RouterLink} to="/organizers" variant="body2" sx={{ textDecoration: 'none', color: 'inherit' }}>
          <MenuItem onClick={handleClose}>Створити спільноту</MenuItem>
        </Link>
        <MenuItem onClick={handleClose}>Створити подію</MenuItem>
      </Menu>
    </>
  );
}
