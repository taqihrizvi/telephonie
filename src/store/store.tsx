import { configureStore, combineReducers, getDefaultMiddleware } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { registrationSlice } from './slices/UI/registrationSlice';
import { footerMenuSlice } from './slices/UI/footerMenu';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';

const reducers: any = combineReducers({
  registration: registrationSlice.reducer,
  footerMenu: footerMenuSlice.reducer,
});

const persistConfig = {
  key: 'root',
  storage,
  stateReconciler: autoMergeLevel2,
  blacklist: ['sessions', 'userStatus'], // here we need to add blacklisted slices for local storage.
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
