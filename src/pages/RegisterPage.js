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
import {
  ACCOUNTING_STEP,
  COMPANY_STEP,
  REVIEW_STEP,
  SHAREHOLDER_STEP,
} from 'config/constants';
import ShareholderOptionalForm from 'components/ShareholderOptionalForm';

const steps = [
  'Company details',
  'Shareholders',
  'Accounting',
  'Review your registration',
];

function renderStepContent(
  step,
  setActiveStep,
  state,
  isLastStep,
  handleBack,
  index
) {
  switch (step) {
    case COMPANY_STEP: {
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
    case SHAREHOLDER_STEP: {
      const { shareholders, displayOptionalForm } = state;
      const shareholder = shareholders[index] || shareholderModel;
      if (displayOptionalForm) {
        return (
          <ShareholderOptionalForm
            shareholder={shareholder}
            activeStep={step}
            isLastStep={isLastStep}
            handleBack={handleBack}
            setActiveStep={setActiveStep}
          />
        );
      }
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

    case ACCOUNTING_STEP: {
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

    case REVIEW_STEP:
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
        Register your Company
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
              handleBack,
              registration.index
            )}
          </React.Fragment>
        )}
      </React.Fragment>
    </React.Fragment>
  );
};

export default RegisterPage;
