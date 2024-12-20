//
import Card from './Card';
import Paper from './Paper';
import Input from './Input';
import Table from './Table';
import Button from './Button';
import Tooltip from './Tooltip';
import Backdrop from './Backdrop';
import Typography from './Typography';
import Autocomplete from './Autocomplete';
import Accordion from './Accordion';
import { Components, Theme } from '@mui/material';

// ----------------------------------------------------------------------

const ComponentsOverrides = (theme: Theme): Components<Theme> => {
  return Object.assign(
    theme.components!,
    Card(theme),
    Table(theme),
    Input(theme),
    Paper(),
    Button(theme),
    Tooltip(theme),
    Backdrop(theme),
    Typography(theme),
    Autocomplete(theme),
    Accordion(theme),
  );
};

export default ComponentsOverrides;
