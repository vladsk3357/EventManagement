import PropTypes from 'prop-types';
import { forwardRef } from 'react';
// icons
import { Icon, IconifyIcon } from '@iconify/react';
// @mui
import { Box } from '@mui/material';

// ----------------------------------------------------------------------

type Props = {
  icon: string | IconifyIcon;
  width?: any;
  sx?: any;
  [rest: string]: any;
};

const Iconify = forwardRef(({ icon, width = 20, sx, ...other }: Props, ref) => (
  <Box ref={ref} component={Icon} icon={icon} sx={{ width, height: width, ...sx }} {...other} />
));

export default Iconify;
