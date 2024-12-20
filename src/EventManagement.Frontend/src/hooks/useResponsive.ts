import { Breakpoint, useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

type Query = 'up' | 'down' | 'between' | 'only';

export default function useResponsive(query: Query, start: Breakpoint, end?: Breakpoint) {
  const theme = useTheme();

  const mediaUp = useMediaQuery(theme.breakpoints.up(start));

  const mediaDown = useMediaQuery(theme.breakpoints.down(start));

  const mediaBetween = useMediaQuery(theme.breakpoints.between(start, end || 0));

  const mediaOnly = useMediaQuery(theme.breakpoints.only(start));

  if (query === 'up') {
    return mediaUp;
  }

  if (query === 'down') {
    return mediaDown;
  }

  if (query === 'between') {
    return mediaBetween;
  }

  return mediaOnly;
}

export function useWidth() {
  const theme = useTheme();

  const keys = [...theme.breakpoints.keys].reverse();

  return keys.find((key) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    return useMediaQuery(theme.breakpoints.up(key));
  }) || 'xs';
}
