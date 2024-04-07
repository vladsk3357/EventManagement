import { Navigate, useRoutes } from 'react-router-dom';
//
import SimpleLayout from './layouts/simple';
import HomeLayout from './layouts/home';
import DefaultLayout from './layouts/default';
import SimpleOrganizersLayout from './layouts/organizers/SimpleOrganizersLayout';
import OrganizersLayout from './layouts/organizers/OrganizersLayout';
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
import CommunitySubscriptionFormPage from './pages/organizers/community/CommunitySubscriptionFormPage';
import CommunitySubscriptionFormAnswerDetailsPage from './pages/organizers/community/CommunitySubscriptionFormAnswerDetailsPage';
import EventDetailsPage from './pages/organizers/events/EventDetailsPage';
import EventAttendeesListPage from './pages/organizers/events/EventAttendeesListPage';
import EventSpeakersListPage from './pages/organizers/events/EventSpeakersListPage';
import EventSchedulePage from './pages/organizers/events/EventSchedulePage';


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
      element: <OrganizersLayout />,
      children: [
        { path: 'dashboard', element: <CommunityDashboardPage />, },
        {
          path: 'events', children: [
            { path: 'list', element: <CommunityEventsPage /> },
            { path: ':eventId/details', element: <EventDetailsPage /> },
            { path: ':eventId/attendees/*', element: <EventAttendeesListPage /> },
            { path: ':eventId/speakers', element: <EventSpeakersListPage /> },
            { path: ':eventId/schedule', element: <EventSchedulePage /> },
          ]
        },
        { path: 'events/create', element: <CreateEventPage /> },
        { path: 'settings', element: <SettingsPage /> },
        { path: 'members', element: <SubscribersPage /> },
        { path: 'registrations', element: <CommunitySubscriptionFormPage /> },
        { path: 'registrations/:answerId', element: <CommunitySubscriptionFormAnswerDetailsPage /> },
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
