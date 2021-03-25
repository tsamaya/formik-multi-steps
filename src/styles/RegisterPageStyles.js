import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  stepper: {
    padding: theme.spacing(3, 0, 5),
  },
  title: {
    textAlign: 'center',
    padding: theme.spacing(3, 0, 5),
  },
}));

export default useStyles;
