/* eslint-disable react/prop-types */
import React, { useContext } from 'react';

import * as Yup from 'yup';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { Paper, Typography } from '@material-ui/core';
import { CheckboxWithLabel, TextField } from 'formik-material-ui';

import {
  ADD_SHAREHOLDER,
  EDIT_SHAREHOLDER,
  DISPLAY_OPTIONAL_FORM,
} from 'actions/types';
import {
  DispatchContext,
  RegistrationContext,
} from 'contexts/register.context';
import useStyles from 'styles/FormStyles';

import { REVIEW_STEP } from 'config/constants';
import DebugFormik from './DebugFormik';
import ActionButtons from './ActionButons';
import RedErrorMessage from './RedErrorMessage';

const ShareholderForm = ({
  shareholder,
  activeStep,
  setActiveStep,
  isLastStep,
  handleBack,
}) => {
  const classes = useStyles();
  const dispatch = useContext(DispatchContext);
  const registration = useContext(RegistrationContext);

  const validationSchema = Yup.object({
    firstName: Yup.string().required(),
    lastName: Yup.string().required(),
    email: Yup.string().email('Invalid email address').required(),
  });

  const handleSubmit = (values, { setSubmitting }) => {
    setTimeout(() => {
      const type = values.id ? EDIT_SHAREHOLDER : ADD_SHAREHOLDER;
      dispatch({
        type,
        payload: values,
      });
      setSubmitting(false);
      //

      if (values.optional) {
        // stay on this step
        dispatch({
          type: DISPLAY_OPTIONAL_FORM,
          payload: true,
        });
        // setActiveStep(SHAREHOLDER_STEP);
      } else if (registration.review) {
        setActiveStep(REVIEW_STEP);
      } else {
        setActiveStep(activeStep + 1);
      }
    }, 500);
  };

  return (
    <Paper className={classes.paper}>
      <Formik
        initialValues={shareholder}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, errors, touched, isSubmitting, submitForm }) => (
          <React.Fragment>
            <Form>
              <Typography variant="h5" className={classes.title}>
                Shareholder
              </Typography>
              <div className={classes.fields}>
                <Field
                  className={classes.field}
                  component={TextField}
                  name="firstName"
                  label="First Name"
                  required
                />
                <Field
                  className={classes.field}
                  component={TextField}
                  name="lastName"
                  label="Last Name"
                  required
                />

                <Field
                  className={classes.field}
                  component={TextField}
                  name="email"
                  type="email"
                  label="Email"
                  fullWidth
                  required
                />

                <div className={classes.field}>
                  {/* error is not automatic */}
                  <Field
                    component={CheckboxWithLabel}
                    type="checkbox"
                    name="optional"
                    Label={{ label: 'Do you agree to tell more' }}
                  />
                  <ErrorMessage name="optional" component={RedErrorMessage} />
                </div>
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
    </Paper>
  );
};
export default ShareholderForm;
