import React from 'react';
import { reducer } from './store';
import StoreProvider from './components/StoreProvider';
import ToggleDialer from './components/ToggleDialer';
import Dialer from './components/Dialer';
import './styles.css';

const initialState = { dialerOpened: false };
const DialerMain = ({ props }: any) => (
  <StoreProvider initialState={initialState} reducer={reducer}>
    {props.userRegState ? <ToggleDialer /> : null}
    <Dialer userRegState={props.userRegState} userSipCaller={props.userSipCaller} userSetRequestUri={props.userSetRequestUri} userRequestUri={props.userRequestUri} />
  </StoreProvider>
);
export default DialerMain;
