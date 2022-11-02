import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { persistStore } from 'redux-persist';
import './i18n.js';
import { Provider } from 'react-redux';
import { store } from './store';
import SipCallerContext from './sipCallerContext';
import SipCaller from './sipCaller';
import { SnackbarProvider } from 'notistack';
import Loading from './components/Loading';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
const persistor = persistStore(store);
SipCaller.init({ store });
const sipCaller: any = new SipCaller();
global.sipCaller = sipCaller;
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={<Loading />} persistor={persistor}>
        <SipCallerContext.Provider value={sipCaller}>
          <SnackbarProvider maxSnack={1}>
            <App />
          </SnackbarProvider>
        </SipCallerContext.Provider>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
