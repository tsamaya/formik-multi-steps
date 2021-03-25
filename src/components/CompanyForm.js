/* eslint-disable react/prop-types */
import React, { useContext } from 'react';

import * as Yup from 'yup';
import { Field, Form, Formik } from 'formik';
// import { Paper } from '@material-ui/core';
import { TextField } from 'formik-material-ui';

import { EDIT_COMPANY } from 'actions/types';
import { DispatchContext } from 'contexts/register.context';
import useStyles from 'styles/FormStyles';

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
      setActiveStep(activeStep + 1);
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
