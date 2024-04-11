import { Box, BoxProps, List } from '@mui/material';
import NavItem from './NavItem';

type Props = BoxProps & {
  data: {
    title: string;
    path: string;
    icon?: React.ReactNode;
    info?: React.ReactNode;
  }[];
};

const NavSection = ({ data = [], ...other }: Props) => {
  return (
    <Box {...other}>
      <List disablePadding sx={{ p: 1 }}>
        {data.map((item) => (
          <NavItem key={item.title} item={item} />
        ))}
      </List>
    </Box>
  );
};

export default NavSection;
