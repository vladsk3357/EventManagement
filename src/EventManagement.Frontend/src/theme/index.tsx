import PropTypes from 'prop-types';
import { ReactNode, useMemo } from 'react';
// @mui
import { CssBaseline, ThemeOptions } from '@mui/material';
import { ThemeProvider as MUIThemeProvider, createTheme, StyledEngineProvider } from '@mui/material/styles';
//
import palette from './palette';
import shadows from './shadows';
import typography from './typography';
import GlobalStyles from './globalStyles';
import customShadows from './customShadows';
import componentsOverride from './overrides';

// ----------------------------------------------------------------------

type Props = {
  children: ReactNode;
}

const ThemeProvider = ({ children }: Props) => {
  const themeOptions: ThemeOptions = useMemo(
    () => ({
      palette,
      shape: { borderRadius: 6 },
      typography,
      shadows: shadows(),
      customShadows: customShadows(),
    }),
    []
  );
  const theme = createTheme(themeOptions);
  theme.components = componentsOverride(theme) as any;

  return (
    <StyledEngineProvider injectFirst>
      <MUIThemeProvider theme={theme}>
        <CssBaseline />
        <GlobalStyles />
        {children}
      </MUIThemeProvider>
    </StyledEngineProvider>
  );
};

export default ThemeProvider;
