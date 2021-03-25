import React from 'react';

const DebugFormik = ({ values, touched, errors }) => {
  return (
    <React.Fragment>
      values<pre>{JSON.stringify(values, null, 2)}</pre>
      touched<pre>{JSON.stringify(touched, null, 2)}</pre>
      errors<pre>{JSON.stringify(errors, null, 2)}</pre>
    </React.Fragment>
  );
};

export default DebugFormik;
