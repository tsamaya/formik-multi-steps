/* eslint-disable react/prop-types */
import React, { useContext } from 'react';

import { Form, Formik } from 'formik';
import {
  Avatar,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  Typography,
} from '@material-ui/core';
import BusinessIcon from '@material-ui/icons/Business';
import EditIcon from '@material-ui/icons/Edit';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import PersonIcon from '@material-ui/icons/Person';

import {
  DispatchContext,
  RegistrationContext,
} from 'contexts/register.context';
import { REGISTER } from 'actions/types';
import useStyles from 'styles/ReviewRegistrationStyles';

import ActionButtons from './ActionButons';

const prepareData = (values) => {
  return {
    company: values.company,
    shareholders: values.shareholders,
    accounting: values.accounting,
  };
};

const ReviewRegistration = ({
  activeStep,
  setActiveStep,
  isLastStep,
  handleBack,
}) => {
  const classes = useStyles();
  const dispatch = useContext(DispatchContext);
  const registration = useContext(RegistrationContext);

  const handleSubmit = (values, { setSubmitting }) => {
    setTimeout(() => {
      dispatch({
        type: REGISTER,
        payload: values,
      });
      const data = prepareData(values);
      // eslint-disable-next-line no-alert
      alert(JSON.stringify(data, null, 2));
      setSubmitting(false);
      //
      setActiveStep(activeStep + 1);
    }, 500);
  };

  const { company, accounting, shareholders } = registration;

  return (
    <Formik initialValues={registration} onSubmit={handleSubmit}>
      {({ isSubmitting, submitForm }) => (
        <React.Fragment>
          <Form>
            <Typography variant="h5" className={classes.title}>
              Review
            </Typography>
            {/* COMPANY */}
            <List>
              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <BusinessIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={company.name}
                  secondary={`${company.address1} ${company.address2}- ${company.zipcode} ${company.city}`}
                />
                <ListItemSecondaryAction>
                  <IconButton
                    edge="end"
                    aria-label="edit"
                    onClick={() => {
                      // TODO next is review
                      setActiveStep(0);
                    }}
                  >
                    <EditIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            </List>
            {/* SHAREHOLDERS */}
            <List>
              {shareholders.map((shareholder, idx) => (
                <ListItem key={idx}>
                  <ListItemAvatar>
                    <Avatar>
                      <PersonIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={`${shareholder.firstName} ${shareholder.lastName}`}
                    secondary={`${shareholder.email}${
                      shareholder.birthdate ? shareholder.birthdate : ''
                    } - ${shareholder.optional ? shareholder.optional : ''}`}
                  />
                  <ListItemSecondaryAction>
                    <IconButton
                      edge="end"
                      aria-label="edit"
                      onClick={() => {
                        // TODO: next => review
                        setActiveStep(1);
                      }}
                    >
                      <EditIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
            {/* ACCOUNTING */}
            <List>
              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <AccountBalanceIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={`Company ${accounting.vat ? 'with' : 'without'} VAT`}
                  secondary={`${
                    accounting.vat ? `VAT Number ${accounting.vatnumber}` : ''
                  }`}
                />
                <ListItemSecondaryAction>
                  <IconButton
                    edge="end"
                    aria-label="edit"
                    onClick={() => {
                      setActiveStep(2);
                    }}
                  >
                    <EditIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            </List>
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
