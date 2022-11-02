import { createSlice } from '@reduxjs/toolkit';

interface IPropType {
  addnewAccount: boolean;
  termsAndConditions: boolean;
}

const initialState: IPropType = {
  addnewAccount: false,
  termsAndConditions: false,
};

export const settingsSlice = createSlice({
  name: 'settingsSlice',
  initialState: { ...initialState },
  reducers: {
    setAddnewAccount: (state: any, action: any) => {
      state.addnewAccount = action.payload;
    },
    setTermsAndCondition: (state: any, action: any) => {
      state.termsAndConditions = action.payload;
    },
  },
});

export const { setAddnewAccount, setTermsAndCondition } = settingsSlice.actions;

export default settingsSlice.reducer;
