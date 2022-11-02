import { createSlice } from '@reduxjs/toolkit';

interface IPropType {
  registrationUI: boolean;
}

const initialState: IPropType = {
  registrationUI: false,
};

export const registrationSlice = createSlice({
  name: 'registration',
  initialState: { ...initialState },
  reducers: {
    showRegistrationUI: (state) => {
      state.registrationUI = true;
    },
    hideRegistrationUI: (state) => {
      state.registrationUI = false;
    },
  },
});

export const { showRegistrationUI, hideRegistrationUI } = registrationSlice.actions;

export default registrationSlice.reducer;
