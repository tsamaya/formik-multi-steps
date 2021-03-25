import React, { useContext } from 'react';
import { Button, Typography } from '@material-ui/core';
import { RESET_CONTEXT } from 'actions/types';
import { DispatchContext } from 'contexts/register.context';
import useStyles from 'styles/RegisterSuccessStyles';

function RegisterSuccess({ setActiveStep }) {
  const classes = useStyles();
  const dispatch = useContext(DispatchContext);

  const handleReset = () => {
    dispatch({ type: RESET_CONTEXT });
    setActiveStep(0);
  };
  return (
    <React.Fragment>
      <Typography variant="h5" gutterBottom>
        Thank you for your registration.
      </Typography>
      <Typography variant="subtitle1">
        Your registration number is #1231539. We have emailed your regitration
        confirmation.
      </Typography>
      <Button
        type="submit"
        variant="contained"
        color="primary"
        className={classes.button}
        onClick={handleReset}
      >
        Reset
      </Button>
    </React.Fragment>
  );
}

export default RegisterSuccess;
