import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Router from './routes';
import { GraphQlProvider } from './graphql';
import ThemeProvider from './theme';
import ScrollToTop from './components/scroll-to-top';
import { ApiProvider } from './api';
import { UserContextProvider } from './components/user';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'

// ----------------------------------------------------------------------

export default function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <HelmetProvider>
        <ApiProvider>
          <UserContextProvider>
            <BrowserRouter>
              <ThemeProvider>
                <GraphQlProvider>
                  <ScrollToTop />
                  <Router />
                </GraphQlProvider>
              </ThemeProvider>
            </BrowserRouter>
          </UserContextProvider>
        </ApiProvider>
      </HelmetProvider >
    </LocalizationProvider>
  );
}
