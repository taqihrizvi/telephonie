import { createSlice } from '@reduxjs/toolkit';

export interface IPropType {
  activeDialer: boolean;
}

const initialState: IPropType = {
  activeDialer: false,
};

export const dialerSlice = createSlice({
  name: 'sideMenuSlice',
  initialState: { ...initialState },
  reducers: {
    setActiveDialer: (state: any, action: any) => {
      state.activeView = action.payload;
    },
    setHiderDialer: () => {
      return initialState;
    },
  },
});

export const { setActiveDialer, setHiderDialer } = dialerSlice.actions;

export default dialerSlice.reducer;
