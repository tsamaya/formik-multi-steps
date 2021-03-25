import React from 'react';

import { Container, CssBaseline, Typography } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';

import RegisterPage from 'pages/RegisterPage';
import { theme, useStyles } from 'styles/AppStyles';
import { RegistrationProvider } from 'contexts/register.context';

const Header = () => {
  const classes = useStyles();
  return (
    <div className={classes.Header}>
      <Typography variant="h3">
        {'{'}Formik{'}'} <span>Multi-Steps</span>
      </Typography>
      <Typography variant="h4" className={classes.Header}>
        A multi-step form with Formik and Material-UI
      </Typography>
    </div>
  );
};

const Footer = () => {
  const classes = useStyles();
  return (
    <div className={classes.Footer}>
      <Typography variant="caption" display="block" gutterBottom>
        Made with{' '}
        <span role="img" aria-label="love">
          ❤️
        </span>{' '}
        in the {'{'}{' '}
        <span role="img" aria-label="love">
          🗻
        </span>{' '}
        {'}'}
      </Typography>
    </div>
  );
};

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container fixed>
        <Header />
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <RegistrationProvider>
            <RegisterPage />
          </RegistrationProvider>
        </MuiPickersUtilsProvider>
        <Footer />
      </Container>
    </ThemeProvider>
  );
};

export default App;
