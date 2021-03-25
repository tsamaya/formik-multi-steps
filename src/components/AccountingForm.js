/* eslint-disable react/prop-types */
import React, { useContext } from 'react';

import * as Yup from 'yup';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { CheckboxWithLabel, TextField } from 'formik-material-ui';

import { EDIT_ACCOUNTING } from 'actions/types';
import { DispatchContext } from 'contexts/register.context';
import useStyles from 'styles/FormStyles';

import DebugFormik from './DebugFormik';
import ActionButtons from './ActionButons';

const ErrorM = ({ children }) => {
  return (
    <div>
      <font color="red">{children}</font>
    </div>
  );
};

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
      //
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
            <div className={classes.fields}>
              <div className={classes.field}>
                {/* error is not automatic */}
                <Field
                  component={CheckboxWithLabel}
                  type="checkbox"
                  name="vat"
                  Label={{ label: 'VAT' }}
                />
                <ErrorMessage name="terms" component={ErrorM} />
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
