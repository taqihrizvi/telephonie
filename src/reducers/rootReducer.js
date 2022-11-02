import { combineReducers } from 'redux';
import user from './user';
import sessions from './sessions';
import sessionHistory from './sessionHistory';
import userStatus from './userStatus';
import notifications from './notifications';
import { registrationSlice } from '../store/slices/UI/registrationSlice';
import { footerMenuSlice } from '../store/slices/UI/footerMenu';
import { dialerSlice } from '../store/slices/UI/Dialer';
import { callButtonSlice } from '../store/slices/UI/callingButton';
import { callSlice } from '../store/slices/Call/callSession';
import { settingsSlice } from '../store/slices/UI/Setting';

export default combineReducers({
  user,
  sessions,
  sessionHistory,
  userStatus,
  notifications,
  registration: registrationSlice.reducer,
  footerMenu: footerMenuSlice.reducer,
  dialerSlice: dialerSlice.reducer,
  callButton: callButtonSlice.reducer,
  callSlice: callSlice.reducer,
  settingsSlice: settingsSlice.reducer,
});
