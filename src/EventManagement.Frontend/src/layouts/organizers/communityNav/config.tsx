import HomeIcon from '@mui/icons-material/Home';
import EventIcon from '@mui/icons-material/Event';
import SettingsIcon from '@mui/icons-material/Settings';
import PeopleIcon from '@mui/icons-material/People';
import ShieldIcon from '@mui/icons-material/Shield';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { NavItem } from '../types';

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
      path: `${baseUrl}/events/list`,
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
      title: 'Комунікація',
      path: `${baseUrl}/communication`,
      icon: <AlternateEmailIcon />,
    },
    {
      title: 'Запросити',
      path: `${baseUrl}/invite`,
      icon: <PersonAddIcon />,
    },
  ] as NavItem[]
};

export default navConfig;
