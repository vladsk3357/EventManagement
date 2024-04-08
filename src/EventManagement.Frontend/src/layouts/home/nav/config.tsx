import PeopleIcon from '@mui/icons-material/People';
import EventIcon from '@mui/icons-material/Event';
import SvgColor from '../../../components/svg-color';

const icon = (name: string) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

type NavItem = {
  title: string;
  path: string;
  icon?: React.ReactNode;
  info?: React.ReactNode;
};

const navConfig: NavItem[] = [
  {
    title: 'Що нового',
    path: '/home',
    icon: icon('ic_analytics'),
  },
  {
    title: 'Мої спільноти',
    path: '/my-communities',
    icon: <PeopleIcon />,
  },
  {
    title: 'Мої події',
    path: '/my-events',
    icon: <EventIcon />,
  },
];

export default navConfig;
