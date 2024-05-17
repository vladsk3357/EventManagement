import EventIcon from '@mui/icons-material/Event';
import PeopleIcon from '@mui/icons-material/People';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import MicIcon from '@mui/icons-material/Mic';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import { NavItem } from '../types';

const navConfig = (communityId: string, eventId: string) => {
  const baseUrl = `/organizers/${communityId}/events/${eventId}`;
  return [
    {
      title: 'Повернутися',
      path: `/organizers/${communityId}/events/list`,
      icon: <ArrowBackIcon />,
    },
    {
      title: 'Деталі',
      path: `${baseUrl}/details`,
      icon: <EventIcon />,
    },
    {
      title: 'Учасники',
      path: `${baseUrl}/attendees`,
      icon: <PeopleIcon />,
    },
    {
      title: 'Програма',
      path: `${baseUrl}/schedule`,
      icon: <AccessTimeIcon />,
    },
    {
      title: 'Спікери',
      path: `${baseUrl}/speakers`,
      icon: <MicIcon />,
    },
    {
      title: 'Завантаження',
      path: `${baseUrl}/uploads`,
      icon: <FileUploadIcon />,
    },
    {
      title: 'Комунікація',
      path: `${baseUrl}/communication`,
      icon: <AlternateEmailIcon />,
    },
  ] as NavItem[]
};

export default navConfig;
