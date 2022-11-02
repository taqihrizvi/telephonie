import { createSlice } from '@reduxjs/toolkit';
import { Dialer_Routes } from '../../../Interfaces';

export interface IPropType {
  activeView: number;
}

const initialState: IPropType = {
  activeView: Dialer_Routes.PEOPLE,
};

export const footerMenuSlice = createSlice({
  name: 'sideMenuSlice',
  initialState: { ...initialState },
  reducers: {
    setActiveView: (state: any, action: any) => {
      state.activeView = action.payload;
    },
    clearSideMenu: () => {
      return initialState;
    },
  },
});

export const { setActiveView, clearSideMenu } = footerMenuSlice.actions;

export default footerMenuSlice.reducer;
