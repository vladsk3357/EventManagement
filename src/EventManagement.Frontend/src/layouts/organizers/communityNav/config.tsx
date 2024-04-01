// component
import HomeIcon from '@mui/icons-material/Home';
import EventIcon from '@mui/icons-material/Event';
import SettingsIcon from '@mui/icons-material/Settings';
import PeopleIcon from '@mui/icons-material/People';
import ShieldIcon from '@mui/icons-material/Shield';
import EditIcon from '@mui/icons-material/Edit';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name: string) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

type NavItem = {
  title: string;
  path: string;
  icon?: React.ReactNode;
  info?: React.ReactNode;
};

const navConfig = (communityId: string) => {
  const baseUrl = `/organizers/${communityId}`;
  return [
    {
      title: 'Дашборд',
      path: `${baseUrl}/dashboard`,
      icon: <HomeIcon />,
    },
    {
      title: 'Події',
      path: `${baseUrl}/events`,
      icon: <EventIcon />,
    },
    {
      title: 'Налаштування',
      path: `${baseUrl}/settings`,
      icon: <SettingsIcon />,
    },
    {
      title: 'Учасники',
      path: `${baseUrl}/members`,
      icon: <PeopleIcon />,
    },
    {
      title: 'Реєстраційна форма',
      path: `${baseUrl}/registrations`,
      icon: <ShieldIcon />,
    },
    {
      title: 'Конструктор форм',
      path: `${baseUrl}/forms`,
      icon: <EditIcon />,
    },
    {
      title: 'Комунікація',
      path: `${baseUrl}/communication`,
      icon: <AlternateEmailIcon />,
    },
    {
      title: 'Запросити',
      path: `${baseUrl}/envite`,
      icon: <PersonAddIcon />,
    },
  ] as NavItem[]
};

export default navConfig;
