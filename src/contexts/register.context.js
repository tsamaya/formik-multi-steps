import React, { createContext } from 'react';
import useLocalStorageReducer from 'hooks/useLocalStorageReducer';
import registrationReducer from 'reducers/registration.reducer';
import defaultRegistration from 'models/initial.context';

export const RegistrationContext = createContext();
export const DispatchContext = createContext();

export const RegistrationProvider = (props) => {
  const [registration, dispatch] = useLocalStorageReducer(
    'registration',
    registrationReducer,
    defaultRegistration
  );

  return (
    <RegistrationContext.Provider value={registration}>
      <DispatchContext.Provider value={dispatch}>
        {props.children}
      </DispatchContext.Provider>
    </RegistrationContext.Provider>
  );
};
