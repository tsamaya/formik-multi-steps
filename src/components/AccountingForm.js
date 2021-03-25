/* eslint-disable react/prop-types */
import React, { useContext } from 'react';

import * as Yup from 'yup';
import { Typography } from '@material-ui/core';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { CheckboxWithLabel, TextField } from 'formik-material-ui';

import { EDIT_ACCOUNTING, REVIEW } from 'actions/types';
import { DispatchContext } from 'contexts/register.context';
import useStyles from 'styles/FormStyles';

import DebugFormik from './DebugFormik';
import ActionButtons from './ActionButons';
import RedErrorMessage from './RedErrorMessage';

const AccountingForm = ({
  accounting,
  activeStep,
  setActiveStep,
  isLastStep,
  handleBack,
}) => {
  const classes = useStyles();
  const dispatch = useContext(DispatchContext);

  const validationSchema = Yup.object({
    vat: Yup.bool().required(),
    vatnumber: Yup.string().when('vat', {
      is: true, // alternatively: (val) => val == true
      then: Yup.string().min(5).required(),
      otherwise: Yup.string(),
    }),
  });

  const handleSubmit = (values, { setSubmitting }) => {
    setTimeout(() => {
      dispatch({
        type: EDIT_ACCOUNTING,
        payload: values,
      });
      setSubmitting(false);
      dispatch({
        type: REVIEW,
        payload: true,
      });
      setActiveStep(activeStep + 1);
    }, 500);
  };

  return (
    <Formik
      initialValues={accounting}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ values, errors, touched, isSubmitting, submitForm }) => (
        <React.Fragment>
          <Form>
            <Typography variant="h5" className={classes.title}>
              Accounting
            </Typography>
            <div className={classes.fields}>
              <div className={classes.field}>
                {/* error is not automatic */}
                <Field
                  component={CheckboxWithLabel}
                  type="checkbox"
                  name="vat"
                  Label={{ label: 'VAT' }}
                />
                <ErrorMessage name="vat" component={RedErrorMessage} />
              </div>

              {values.vat ? (
                <Field
                  className={classes.field}
                  component={TextField}
                  name="vatnumber"
                  label="VAT Number"
                  fullWidth
                  required
                />
              ) : null}
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
export default AccountingForm;
