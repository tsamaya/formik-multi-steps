/* eslint-disable react/prop-types */
import React, { useContext } from 'react';

import * as Yup from 'yup';
import { Field, Form, Formik } from 'formik';
import { Paper, Typography } from '@material-ui/core';
import { TextField } from 'formik-material-ui';
import { KeyboardDatePicker } from 'formik-material-ui-pickers';

import { DISPLAY_OPTIONAL_FORM, EDIT_SHAREHOLDER } from 'actions/types';
import {
  DispatchContext,
  RegistrationContext,
} from 'contexts/register.context';
import useStyles from 'styles/FormStyles';

import { REVIEW_STEP } from 'config/constants';
import DebugFormik from './DebugFormik';
import ActionButtons from './ActionButons';

const DATE_FORMAT = 'dd/MM/yyyy';
const DATE_PLACEHOLDER = 'DD/MM/YYYY';

const ShareholderOptionalForm = ({
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
    optionalInfo: Yup.string(),
    birthdate: Yup.date().required(),
  });

  const handleSubmit = (values, { setSubmitting }) => {
    setTimeout(() => {
      dispatch({
        type: EDIT_SHAREHOLDER,
        payload: values,
      });
      dispatch({
        type: DISPLAY_OPTIONAL_FORM,
        payload: false,
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
                  name="optionalInfo"
                  label="Note"
                  fullWidth
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
export default ShareholderOptionalForm;
