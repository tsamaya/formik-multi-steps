/* eslint-disable react/prop-types */
import React, { useContext } from 'react';

import * as Yup from 'yup';
import { Field, Form, Formik } from 'formik';
import { Paper } from '@material-ui/core';
import { TextField } from 'formik-material-ui';
import { KeyboardDatePicker } from 'formik-material-ui-pickers';

import { ADD_SHAREHOLDER, EDIT_SHAREHOLDER } from 'actions/types';
import { DispatchContext } from 'contexts/register.context';
import useStyles from 'styles/FormStyles';

import DebugFormik from './DebugFormik';
import ActionButtons from './ActionButons';

const DATE_FORMAT = 'dd/MM/yyyy';
const DATE_PLACEHOLDER = 'DD/MM/YYYY';

const ShareholderForm = ({
  shareholder,
  activeStep,
  setActiveStep,
  isLastStep,
  handleBack,
}) => {
  const classes = useStyles();
  const dispatch = useContext(DispatchContext);

  const validationSchema = Yup.object({
    firstName: Yup.string().required(),
    lastName: Yup.string().required(),
    email: Yup.string().email('Invalid email address').required(),
    birthdate: Yup.date().required(),
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
      setActiveStep(activeStep + 1);
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

                <Field
                  className={classes.field}
                  component={KeyboardDatePicker}
                  name="birthdate"
                  label="Date of Birth"
                  clearable={true}
                  required
                  format={DATE_FORMAT}
                  placeholder={DATE_PLACEHOLDER}
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
    </Paper>
  );
};
export default ShareholderForm;
