import React from 'react';

const RedErrorMessage = ({ children }) => {
  return (
    <div>
      <font color="red">{children}</font>
    </div>
  );
};

export default RedErrorMessage;
