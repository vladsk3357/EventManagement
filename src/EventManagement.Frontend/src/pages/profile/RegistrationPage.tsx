import { Helmet } from 'react-helmet-async';
// @mui
import { styled } from '@mui/material/styles';
import { Container, Typography } from '@mui/material';
// hooks
import useResponsive from '../../hooks/useResponsive';
// sections
import { RegistrationForm } from '../../sections/profile/registration';
import BaseLayout from '../../layouts/base';

// ----------------------------------------------------------------------

const StyledRoot = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}));

const StyledSection = styled('div')(({ theme }) => ({
  width: '100%',
  maxWidth: 480,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  overflow: 'hidden',
  boxShadow: theme.customShadows?.card,
  backgroundColor: theme.palette.background.default,
}));

const StyledContent = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(12, 0),
}));

const StyledImage = styled('img')(({ theme }) => ({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
}));

// ----------------------------------------------------------------------

export default function RegistrationPage() {
  const mdUp = useResponsive('up', 'md');

  return (
    <BaseLayout authenticationRequired={false}>
      <Helmet>
        <title>Реєстрація | Events</title>
      </Helmet>

      <StyledRoot>
        {mdUp && (
          <StyledSection>
            <StyledImage src="/assets/illustrations/illustration_registration.jpg" alt="registration" />
          </StyledSection>
        )}

        <Container maxWidth="sm">
          <StyledContent>
            <Typography variant="h4" gutterBottom>
              Розпочнемо
            </Typography>

            <Typography variant="body2" sx={{ mb: 3 }}>
              Приєднуйтеся та досліджуйте Events
            </Typography>

            <RegistrationForm />
          </StyledContent>
        </Container>
      </StyledRoot>
    </BaseLayout>
  );
}
