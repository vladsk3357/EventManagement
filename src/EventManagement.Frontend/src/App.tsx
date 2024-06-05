import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Router from './routes';
import ThemeProvider from './theme';
import ScrollToTop from './components/scroll-to-top';
import { ApiProvider } from './api';
import { UserContextProvider } from './components/user';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import moment from "moment";
import 'moment/dist/locale/uk'

moment.locale('uk');

export default function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterMoment} adapterLocale="uk">
      <HelmetProvider>
        <ApiProvider>
          <UserContextProvider>
            <ThemeProvider>
              <BrowserRouter>
                <ScrollToTop />
                <Router />
              </BrowserRouter>
            </ThemeProvider>
          </UserContextProvider>
        </ApiProvider>
      </HelmetProvider >
    </LocalizationProvider>
  );
}
