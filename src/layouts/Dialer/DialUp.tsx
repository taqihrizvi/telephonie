import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Help from './Help';
import People from './People';
import History from './History';
import Settings from './Settings';
import Dial from '../../components/Dial';
import { Dialer_Routes } from '../../Interfaces';
import { useAppSelector } from '../../components/hooks/hook';
import { WithSipCallerContext } from '../../sipCallerContext';
import * as stateActions from '../../components/actions/stateActions';

const DialUp = (props: any) => {
  const footerMenuState = useAppSelector((state: any) => state.footerMenu.activeView);
  const { sipCaller, setRequestUri } = props;

  return (
    <div className="bg-white w-[360px]">
      <div className="z-[0] w-[328px] h-[48px] m-auto ">{footerMenuState === Dialer_Routes.PEOPLE ? <People /> : footerMenuState === Dialer_Routes.HISTORY ? <History /> : footerMenuState === Dialer_Routes.SETTING ? <Settings /> : <Help />}</div>
      <div className="mt-28">
        <Dial userSipCaller={sipCaller} userSetRequestUri={setRequestUri} />
      </div>
    </div>
  );
};

DialUp.propTypes = {
  sipCaller: PropTypes.any.isRequired,
  requestUri: PropTypes.string,
  registered: PropTypes.bool.isRequired,
  setRequestUri: PropTypes.func.isRequired,
};

const mapStateToProps = (state: any) => ({
  requestUri: state.user.requestUri,
  registered: state.userStatus.registered,
});

const mapDispatchToProps = (dispatch: any) => ({
  setRequestUri: (requestUri: any): String => dispatch(stateActions.setRequestUri({ requestUri })),
});

export default WithSipCallerContext(connect(mapStateToProps, mapDispatchToProps)(DialUp));
