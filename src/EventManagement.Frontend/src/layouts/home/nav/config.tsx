import PeopleIcon from '@mui/icons-material/People';
import EventIcon from '@mui/icons-material/Event';
import SvgColor from '../../../components/svg-color';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import DateRangeIcon from '@mui/icons-material/DateRange';

const icon = (name: string) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

type NavItem = {
  title: string;
  path: string;
  icon?: React.ReactNode;
  info?: React.ReactNode;
};

const navConfig: NavItem[] = [
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
  {
    title: 'Дослідити спільноти',
    path: '/discover-communities',
    icon: <GroupAddIcon />,
  },
  {
    title: 'Дослідити події',
    path: '/discover-events',
    icon: <DateRangeIcon />,
  },
];

export default navConfig;
