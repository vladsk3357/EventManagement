import { Navigate, useRoutes } from 'react-router-dom';
//
import SimpleLayout from './layouts/simple';
import HomeLayout from './layouts/home';
import DefaultLayout from './layouts/default';
import SimpleOrganizersLayout from './layouts/organizers/SimpleOrganizersLayout';
import CommunityLayout from './layouts/organizers/CommunityLayout';
import RegistrationPage from './pages/profile/RegistrationPage';
import LoginPage from './pages/profile/LoginPage';
import Page404 from './pages/error/Page404';
import HomePage from './pages/HomePage';
import UserDetailsPage from './pages/UserDetailsPage';
import Edit from './layouts/edit';
import EditProfilePage from './pages/edit/EditProfilePage';
import CommunitiesListPage from './pages/organizers/community/CommunitiesListPage';
import CreateCommunityPage from './pages/organizers/community/CreateCommunityPage';
import CommunityDashboardPage from './pages/organizers/community/CommunityDashboardPage';
import CommunityEventsPage from './pages/organizers/community/CommunityEventsPage';
import CreateEventPage from './pages/organizers/events/CreateEventPage';
import SettingsPage from './pages/organizers/community/SettingsPage';
import SubscribersPage from './pages/organizers/community/SubscribersPage';
import CommunityPage from './pages/community/CommunityPage';
import MyCommunitiesPage from './pages/myCommunities/MyCommunitiesPage';
import EventPage from './pages/event/EventPage';

// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      path: '',
      element: <HomeLayout />,
      children: [
        { element: <HomePage />, index: true },
        { path: 'my-communities', element: <MyCommunitiesPage /> },
      ],
    },
    {
      path: 'register',
      element: <RegistrationPage />,
    },
    {
      path: 'login',
      element: <LoginPage />,
    },
    {
      path: 'edit',
      element: <Edit />,
      children: [
        { element: <EditProfilePage />, path: 'profile', index: true },
      ],
    },
    {
      path: 'organizers',
      element: <SimpleOrganizersLayout />,
      children: [
        { element: <CommunitiesListPage />, index: true },
        { path: 'create', element: <CreateCommunityPage /> },
      ],
    },
    {
      path: 'organizers/:communityId',
      element: <CommunityLayout />,
      children: [
        { path: 'dashboard', element: <CommunityDashboardPage />, index: true },
        { path: 'events', element: <CommunityEventsPage /> },
        { path: 'events/create', element: <CreateEventPage /> },
        { path: 'settings', element: <SettingsPage /> },
        { path: 'members', element: <SubscribersPage /> },
      ],
    },
    {
      path: '/community/:communityId',
      element: <DefaultLayout />,
      children: [
        { element: <CommunityPage />, index: true },
        { path: ':eventId', element: <EventPage /> },
      ],
    },

    // {
    //   path: 'create',
    //   element: <DefaultLayout />,
    //   children: [
    //   ],
    // },
    // {
    //   path: ':username',
    //   element: <DefaultLayout />,
    //   children: [
    //     { element: <UserDetailsPage />, index: true },
    //   ],
    // },

    {
      path: '*',
      element: <Page404 />,
    },
  ]);

  return routes;
}
