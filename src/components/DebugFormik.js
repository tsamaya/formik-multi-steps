import React from 'react';
import BugReportIcon from '@material-ui/icons/BugReport';
import useToggleState from 'hooks/useToggleState';
import { IconButton, Paper } from '@material-ui/core';

const DebugFormik = ({ values, touched, errors }) => {
  const [isVisible, toggle] = useToggleState(false);

  return (
    <Paper>
      <IconButton
        edge="end"
        aria-label="debug"
        onClick={() => {
          toggle();
        }}
      >
        <BugReportIcon />
      </IconButton>

      {isVisible && (
        <div>
          values<pre>{JSON.stringify(values, null, 2)}</pre>
          touched<pre>{JSON.stringify(touched, null, 2)}</pre>
          errors<pre>{JSON.stringify(errors, null, 2)}</pre>
        </div>
      )}
    </Paper>
  );
};

export default DebugFormik;
