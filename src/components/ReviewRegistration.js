/* eslint-disable react/prop-types */
import React, { useContext } from 'react';

import { Form, Formik } from 'formik';
import {
  DispatchContext,
  RegistrationContext,
} from 'contexts/register.context';
import { REGISTER } from 'actions/types';
// import useStyles from 'styles/ReviewRegistrationStyles';

import ActionButtons from './ActionButons';

const ReviewRegistration = ({
  activeStep,
  setActiveStep,
  isLastStep,
  handleBack,
}) => {
  //   const classes = useStyles();
  const dispatch = useContext(DispatchContext);
  const registration = useContext(RegistrationContext);

  const handleSubmit = (values, { setSubmitting }) => {
    setTimeout(() => {
      dispatch({
        type: REGISTER,
        payload: values,
      });
      setSubmitting(false);
      //
      setActiveStep(activeStep + 1);
    }, 500);
  };

  return (
    <Formik initialValues={registration} onSubmit={handleSubmit}>
      {({ isSubmitting, submitForm }) => (
        <React.Fragment>
          <Form>
            <pre>{JSON.stringify(registration, null, 2)}</pre>{' '}
            <ActionButtons
              activeStep={activeStep}
              isLastStep={isLastStep}
              handleBack={handleBack}
              isSubmitting={isSubmitting}
              submitForm={submitForm}
            />
          </Form>
        </React.Fragment>
      )}
    </Formik>
  );
};

export default ReviewRegistration;
