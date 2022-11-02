import React, { useEffect } from 'react';

import Footer from './components/Footer';
import Header from './components/Header';
import DialUp from './layouts/Dialer/DialUp';

import BackNavigation from './components/BackNavigation';
import Registration from './layouts/Registration/Registration';
import { setAceptCalling } from './store/slices/Call/callSession';
import CallRinging from './layouts/CallRinging/OutGoingCallRinging';
import TermsAndCondition from './layouts/Settings/TermsAndCondition';
import { useAppSelector, useAppDispatch } from './components/hooks/hook';
import InCommingCallRinging from './layouts/CallRinging/InCommingCallRinging';
import { setAddnewAccount, setTermsAndCondition } from './store/slices/UI/Setting';

function App() {
  const registered = useAppSelector((state: any): boolean => state.userStatus.registered);
  const callRinging = useAppSelector((state: any): boolean => state.callSlice.OutGoingcallRinging);
  const addNewAccount = useAppSelector((state: any): boolean => state.settingsSlice.addnewAccount);
  const termsAndCondition = useAppSelector((state: any): boolean => state.settingsSlice.termsAndConditions);
  const IncommingcallRinging = useAppSelector((state: any): boolean => state.callSlice.IncomingcallRinging);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setAceptCalling(false)); // for temporary purposes it will fix after clear to logic of incomming call
    dispatch(setAddnewAccount(false));
    dispatch(setTermsAndCondition(false));
  }, [IncommingcallRinging]);
  return (
    <div className="relative flex h-screen justify-center  items-center ">
      <Header />
      <div className="absolute top-10  bg-white">
        {!registered || addNewAccount ? ( // here check the registration or add newAccount is active or not
          <>
            <BackNavigation />
            <Registration />
          </>
        ) : (
          <div className="h-[670px] bg-white">
            {callRinging ? (
              <CallRinging /> // here check the callRinging is active or not
            ) : IncommingcallRinging ? ( // for temporary purposes it will fix after clear to logic of incomming call
              <InCommingCallRinging /> // for temporary purposes it will fix after clear to logic of incomming call
            ) : termsAndCondition ? (
              <TermsAndCondition /> // here check the TermsAndCondition is active or not
            ) : (
              <>
                <DialUp />
                <Footer />
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
