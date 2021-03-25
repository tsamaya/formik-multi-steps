import React, { useContext, useState } from 'react';

import { Stepper, Step, StepLabel, Typography } from '@material-ui/core';

import RegisterSuccess from 'components/RegisterSuccess';
import useStyles from 'styles/RegisterPageStyles';
import shareholderModel from 'models/shareholder.model';
import CompanyForm from 'components/CompanyForm';
import { RegistrationContext } from 'contexts/register.context';
import ShareholderForm from 'components/ShareholderForm';
import AccountingForm from 'components/AccountingForm';
import ReviewRegistration from 'components/ReviewRegistration';

const steps = [
  'Company details',
  'Shareholders',
  'Accounting',
  'Review your registration',
];

function renderStepContent(step, setActiveStep, state, isLastStep, handleBack) {
  switch (step) {
    case 0: {
      const { company } = state;
      return (
        <CompanyForm
          company={company}
          activeStep={step}
          isLastStep={isLastStep}
          handleBack={handleBack}
          setActiveStep={setActiveStep}
        />
      );
    }
    case 1: {
      const { shareholders } = state;
      const shareholder = shareholders[0] || shareholderModel;
      return (
        <ShareholderForm
          shareholder={shareholder}
          activeStep={step}
          isLastStep={isLastStep}
          handleBack={handleBack}
          setActiveStep={setActiveStep}
        />
      );
    }

    case 2: {
      const { accounting } = state;
      return (
        <AccountingForm
          accounting={accounting}
          activeStep={step}
          isLastStep={isLastStep}
          handleBack={handleBack}
          setActiveStep={setActiveStep}
        />
      );
    }

    case 3:
      return (
        <ReviewRegistration
          activeStep={step}
          isLastStep={isLastStep}
          handleBack={handleBack}
          setActiveStep={setActiveStep}
        />
      );

    default:
      return <div>Not Found</div>;
  }
}

const RegisterPage = () => {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);

  const registration = useContext(RegistrationContext);

  const isLastStep = activeStep === steps.length - 1;

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  return (
    <React.Fragment>
      <Typography variant="h4" className={classes.title}>
        Register
      </Typography>
      <Stepper activeStep={activeStep} className={classes.stepper}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <React.Fragment>
        {activeStep === steps.length ? (
          <RegisterSuccess setActiveStep={setActiveStep} />
        ) : (
          <React.Fragment>
            {renderStepContent(
              activeStep,
              setActiveStep,
              registration,
              isLastStep,
              handleBack
            )}
          </React.Fragment>
        )}
      </React.Fragment>
    </React.Fragment>
  );
};

export default RegisterPage;
