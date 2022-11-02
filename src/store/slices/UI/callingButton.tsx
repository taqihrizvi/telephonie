import { createSlice } from '@reduxjs/toolkit';

export interface IPropType {
  dialerNumber: boolean;
}

const initialState: IPropType = {
  dialerNumber: false,
};

export const callButtonSlice = createSlice({
  name: 'callButtonSlice',
  initialState: { ...initialState },
  reducers: {
    setdialerButton: (state: any, action: any) => {
      state.dialerNumber = action.payload;
    },
    // setHideDialernumber: () => {
    //   return initialState; // will be called in near future
    // },
  },
});

export const { setdialerButton } = callButtonSlice.actions;

export default callButtonSlice.reducer;
