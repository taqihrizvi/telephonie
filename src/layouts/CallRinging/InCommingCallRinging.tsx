import React, { MouseEvent, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';

import CallTimer from '../../components/CallTimer';
import * as sessionStates from '../../sessionStates';
import { Tele_Force_Images } from '../../config/images';
import { WithSipCallerContext } from '../../sipCallerContext';
import * as stateActions from '../../components/actions/stateActions';
import OnGoingFeatures from '../onGoingFeatures/OnGoingFeatures';

const InCommingCallRinging = (props: any) => {
  const [callAttend, setCallAttend] = useState<boolean>(false); // for temporary use afer enabling the inCOmming call it will change with response
  const { t } = useTranslation();
  const { session, sipCaller, incomingSessions } = props;
  const number = '(+45) 12-34-56-78';
  const country = 'Denmark'; // for temporary use afer enabling the inCOmming call it will change with response
  console.log(incomingSessions); // for temporary use afer enabling the inCOmming call it will remove

  const closeHandler = (e: MouseEvent<HTMLElement>): void => {};
  const activateCall = () => {
    setCallAttend(true);
    if (session?.sipSession) {
      sipCaller.accept(session?.sipSession);
    }
  };

  return (
    <div className="w-[360px] flex flex-col justify-center items-center">
      <div className="mt-2 text-center">
        <img src={Tele_Force_Images.RINGING} width={150} height={150} alt="ringing" className="ml-7" />
        <p className="font-Worksans font-medium">{country}</p>
        <p className="font-Worksans font-medium text-2xl mt-4">{number}</p>
        {callAttend && <CallTimer />}
      </div>
      {session && session.remoteStream ? (
        <OnGoingFeatures />
      ) : (
        <>
          <div className="text-center">
            <p className="font-Worksans font-medium text-xl mt-4 text-gray-500">{t('Incoming_call')}</p>
          </div>
        </>
      )}
      <div className={callAttend ? 'flex justify-around mt-10 w-[300px]' : 'flex justify-around mt-60 w-[300px]'}>
        <div className="cursor-pointer p-5 bg-[#EA4335] rounded-full">
          <img src={Tele_Force_Images.CALL_END} width="32px" height="32px" alt="cancel" onClick={closeHandler} />
        </div>
        {!callAttend && (
          <div className="cursor-pointer p-5 bg-CallBtn rounded-full">
            <img src={Tele_Force_Images.PHONE} width="32px" height="32px" alt="cancel" onClick={activateCall} />
          </div>
        )}
      </div>
    </div>
  );
};

InCommingCallRinging.propTypes = {
  sipCaller: PropTypes.object.isRequired,
  incomingSessions: PropTypes.array.isRequired,
  session: PropTypes.object,
  // transferUri: PropTypes.string,
  // setTransferUri: PropTypes.func.isRequired,  // both will be used in near future
};

const mapStateToProps = (state: any) => ({
  session: state.sessions[state.userStatus.currentSession],
  transferUri: state.user.transferUri,
  incomingSessions: Object.values(state.sessions).filter((session: any) => session?.sessionState === sessionStates?.NEW && session?.direction === sessionStates?.INCOMING),
});

const mapDispatchToProps = (dispatch: any) => ({
  setTransferUri: (transferUri: any) => dispatch(stateActions.setTransferUri({ transferUri })),
});

export default WithSipCallerContext(connect(mapStateToProps, mapDispatchToProps)(InCommingCallRinging));
