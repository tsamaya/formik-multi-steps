/* eslint-disable react/prop-types */
import React, { useContext } from 'react';

import { Typography } from '@material-ui/core';
import * as Yup from 'yup';
import { Field, Form, Formik } from 'formik';
// import { Paper } from '@material-ui/core';
import { TextField } from 'formik-material-ui';

import { EDIT_COMPANY } from 'actions/types';
import {
  DispatchContext,
  RegistrationContext,
} from 'contexts/register.context';
import useStyles from 'styles/FormStyles';

import { REVIEW_STEP } from 'config/constants';
import DebugFormik from './DebugFormik';
import ActionButtons from './ActionButons';

const CompanyForm = ({
  company,
  activeStep,
  setActiveStep,
  isLastStep,
  handleBack,
}) => {
  const classes = useStyles();
  const dispatch = useContext(DispatchContext);
  const registration = useContext(RegistrationContext);

  const validationSchema = Yup.object({
    name: Yup.string().max(32, 'Must be 32 characters or less').required(),
    address1: Yup.string().required(),
    zipcode: Yup.string().required(),
    city: Yup.string().required(),
  });

  const handleSubmit = (values, { setSubmitting }) => {
    setTimeout(() => {
      dispatch({
        type: EDIT_COMPANY,
        payload: values,
      });
      setSubmitting(false);
      //
      if (registration.review) {
        setActiveStep(REVIEW_STEP);
      } else {
        setActiveStep(activeStep + 1);
      }
    }, 500);
  };

  return (
    <Formik
      initialValues={company}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ values, errors, touched, isSubmitting, submitForm }) => (
        <React.Fragment>
          <Form>
            <Typography variant="h5" className={classes.title}>
              Company details
            </Typography>
            <div className={classes.fields}>
              <Field
                className={classes.field}
                component={TextField}
                name="name"
                label="Company Name"
                required
                fullWidth
              />

              <Field
                className={classes.field}
                component={TextField}
                name="address1"
                label="Address Line 1"
                required
                fullWidth
              />

              <Field
                className={classes.field}
                component={TextField}
                name="address2"
                label="Address Line 2"
                fullWidth
              />

              <Field
                className={classes.field}
                component={TextField}
                name="zipcode"
                label="Zipcode"
                required
              />

              <Field
                className={classes.field}
                component={TextField}
                name="city"
                label="City"
                required
              />
            </div>

            <ActionButtons
              activeStep={activeStep}
              isLastStep={isLastStep}
              handleBack={handleBack}
              isSubmitting={isSubmitting}
              submitForm={submitForm}
            />
          </Form>
          <DebugFormik values={values} touched={touched} errors={errors} />
        </React.Fragment>
      )}
    </Formik>
  );
};
export default CompanyForm;
