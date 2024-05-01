import { Theme } from "@mui/material/styles";

// ----------------------------------------------------------------------

export default function Accordion(theme: Theme) {
  return {
    MuiAccordion: {
      styleOverrides: {
        root: {
          boxShadow: theme.customShadows?.accordion,
        },
      },
    },
  };
}
