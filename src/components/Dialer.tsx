import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { WithSipCallerContext } from '../../src/sipCallerContext';
import { withStyles } from '@material-ui/core/styles';
import * as stateActions from '../components/actions/stateActions';
import DialerMain from './dialerMain/DialerMain';

const styles: any = ({ theme }: any) => ({
  grid: {
    width: '50vw',
  },
  call: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    '&:hover': {},
    marginRight: theme.spacing.unit * 2,
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing.unit * 3,
      width: 'auto',
    },
  },
  callIcon: {
    width: theme.spacing.unit * 5,
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 5,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '100%',
    },
  },
});
const Dialer = ({ props }: any) => {
  useEffect(() => {
    const unloadCallback = (event: any) => {
      event.preventDefault();
      event.returnValue = 'Your call will be disconnected, are you sure you want to reload?';
      window.prompt('Your call will be disconnected, are you sure you want to reload?');
      return 'Your call will be disconnected, are you sure you want to reload?';
    };

    window.addEventListener('beforeunload', unloadCallback);
    return () => window.removeEventListener('beforeunload', unloadCallback);
  }, []);
  const { sipCaller, requestUri, registered, setRequestUri } = props;

  return <DialerMain userRegState={registered} userSipCaller={sipCaller} userSetRequestUri={setRequestUri} userRequestUri={requestUri} />;
};

Dialer.propTypes = {
  sipCaller: PropTypes.any.isRequired,
  requestUri: PropTypes.string,
  registered: PropTypes.bool.isRequired,
  setRequestUri: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = ({ state }: any) => ({
  requestUri: state.user.requestUri,
  registered: state.userStatus.registered,
});

const mapDispatchToProps = ({ dispatch }: any) => ({
  setRequestUri: ({ requestUri }: any) => dispatch(stateActions.setRequestUri({ requestUri })),
});

export default WithSipCallerContext(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Dialer)));
