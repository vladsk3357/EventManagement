import customShadows from './customShadows';

export { }; // this file needs to be a module
declare module '@mui/material/styles' {

  interface Theme {
    customShadows?: ReturnType<typeof customShadows>;
  }

  interface TypeBackground {
    neutral: string;
  }

  // allow configuration using `createTheme`
  interface ThemeOptions {
    customShadows?: ReturnType<typeof customShadows>;
  }
}