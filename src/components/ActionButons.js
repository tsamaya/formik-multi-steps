import React from 'react';
import { Button, CircularProgress } from '@material-ui/core';
import useStyles from 'styles/FormStyles';

const ActionButtons = ({
  activeStep,
  isLastStep,
  handleBack,
  isSubmitting,
  submitForm,
}) => {
  const classes = useStyles();
  return (
    <div className={classes.buttons}>
      {activeStep !== 0 && (
        <Button onClick={handleBack} className={classes.button}>
          Back
        </Button>
      )}
      <div className={classes.wrapper}>
        <Button
          disabled={isSubmitting}
          type="submit"
          variant="contained"
          color="primary"
          className={classes.button}
          onClick={submitForm}
        >
          {isLastStep ? 'Register' : 'Next'}
        </Button>
        {isSubmitting && (
          <CircularProgress size={24} className={classes.buttonProgress} />
        )}
      </div>
    </div>
  );
};

export default ActionButtons;
