// component
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name: string) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

type NavItem = {
  title: string;
  path: string;
  icon?: ReturnType<typeof icon>;
  info?: React.ReactNode;
};

const navConfig: NavItem[] = [
  {
    title: 'Інформація',
    path: '/edit/profile',
    icon: icon('profile'),
  },
];

export default navConfig;
