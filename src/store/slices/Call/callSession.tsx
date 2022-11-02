import { createSlice } from '@reduxjs/toolkit';

export interface callPropType {
  OutGoingcallRinging: boolean;
  IncomingcallRinging: boolean;
  transferCall: boolean;
  dialerNumber: string;
  transferNumberData: {
    number?: string;
    name?: string;
  };
  CallTimer: boolean;
}

const initialState: callPropType = {
  OutGoingcallRinging: false,
  IncomingcallRinging: false,
  transferCall: false,
  dialerNumber: '',
  transferNumberData: {
    number: '',
    name: '',
  },
  CallTimer: false,
};

export const callSlice = createSlice({
  name: 'callSlice',
  initialState: { ...initialState },
  reducers: {
    setApplyCalling: (state: any, action: any) => {
      state.OutGoingcallRinging = action.payload;
    },
    setAceptCalling: (state: any, action: any) => {
      state.IncomingcallRinging = action.payload;
    },
    setDialerNumber: (state: any, action: any) => {
      state.dialerNumber = action.payload;
    },
    setTransferNumber: (state: any, action: any) => {
      state.transferNumberData = action.payload;
    },
    setTransferCall: (state: any, action: any) => {
      state.transferCall = action.payload;
    },
    setCallTimer: (state: any, action: any) => {
      state.callTimer = action.payload;
    },
    // setHideDialernumber: () => {
    //   return initialState;   //will be called  in near future
    // },
  },
});

export const { setApplyCalling, setDialerNumber, setCallTimer, setAceptCalling, setTransferCall, setTransferNumber } = callSlice.actions;

export default callSlice.reducer;
