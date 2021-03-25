import {
  createMuiTheme,
  makeStyles,
  responsiveFontSizes,
} from '@material-ui/core/styles';

const muiTheme = createMuiTheme({});

const theme = responsiveFontSizes(muiTheme);

const useStyles = makeStyles(() => ({
  Header: {
    textAlign: 'center',
    '& h3': {
      color: '#2c3e50',
      margin: '5vh 0 0 0',
      fontSize: '5rem',
      fontWeight: '300',
      '& span': {
        fontWeight: '700',
      },
    },
    '& h4': {
      color: '#9a9095',
      fontSize: '1rem',
    },
  },
  Footer: {
    display: 'flex',
    justifyContent: 'center',
    backfaceVisibility: 'hidden',
    color: '#8371e2',
    fontSize: '0.7rem',
    position: 'relative',
    textDecoration: 'none',
    transition: '0.5s color ease',
    padding: theme.spacing(3, 0, 5),
  },
}));

export { theme, useStyles };
