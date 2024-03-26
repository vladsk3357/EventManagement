import { StyledNavItem, StyledNavItemIcon } from './styles';
import { NavLink as RouterLink } from 'react-router-dom';
import { ListItemText } from '@mui/material';

type Props = {
  item: {
    title: string;
    path: string;
    icon?: React.ReactNode;
    info?: React.ReactNode;
  };
};

const NavItem = ({ item }: Props) => {
  const { title, path, icon, info } = item;

  return (
    <StyledNavItem
      component={RouterLink}
      disableGutters
      to={path}
      sx={{
        '&.active': {
          color: 'text.primary',
          bgcolor: 'action.selected',
          fontWeight: 'fontWeightBold',
        },
      }}

    >
      <StyledNavItemIcon>{icon && icon}</StyledNavItemIcon>

      <ListItemText disableTypography primary={title} />

      {info && info}
    </StyledNavItem>
  );
};

export default NavItem;
