import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  fields: {},
  field: {
    margin: '5px',
  },
  // ActionButtons
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
  wrapper: {
    margin: theme.spacing(1),
    position: 'relative',
  },
}));

export default useStyles;
