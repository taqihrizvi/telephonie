import React, { MouseEvent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { useTranslation } from 'react-i18next';
import CallTimer from '../../components/CallTimer';
import * as sessionStates from '../../sessionStates';
import { Tele_Force_Images } from '../../config/images';
import { WithSipCallerContext } from '../../sipCallerContext';
import OnGoingFeatures from '../onGoingFeatures/OnGoingFeatures';
import * as stateActions from '../../components/actions/stateActions';
import { useAppDispatch, useAppSelector } from '../../components/hooks/hook';
import { setApplyCalling, setCallTimer, setTransferCall } from '../../store/slices/Call/callSession';

const CallRinging = (props: any) => {
  const numberDialed = useAppSelector((state: any): string => state.callSlice.dialerNumber);
  const transferCall = useAppSelector((state: any): string => state.callSlice.transferCall);
  const transferNumber = useAppSelector((state: any): string => state.callSlice.transferNumberData.num);
  const transferName = useAppSelector((state: any): string => state.callSlice.transferNumberData.name);

  const country = 'Denmark';
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { sipCaller, session } = props;

  const closeHandler = (e: MouseEvent<HTMLElement>): void => {
    e.preventDefault();
    if (!session.sipSession) {
      dispatch(setApplyCalling(false));
      dispatch(setCallTimer(false));
      dispatch(setTransferCall(false));
    } else {
      sipCaller.terminate(session.sipSession);
      dispatch(setApplyCalling(false));
      dispatch(setCallTimer(false));
      dispatch(setTransferCall(false));
    }
  };

  if (session && session.sessionState === sessionStates.TERMINATED) {
    dispatch(setApplyCalling(false));
    dispatch(setCallTimer(false));
    dispatch(setTransferCall(false));
  }

  return (
    <div className="w-[360px] flex flex-col justify-center items-center">
      <div className={session ? 'mt-2 text-center' : 'mt-2 text-center'}>
        {transferCall ? (
          <>
            <div className="flex justify-around w-[360px] ">
              <div className="flex flex-col items-center">
                <img src={Tele_Force_Images.RINGING} width={100} height={100} alt="ringing" />
                <p className="font-Worksans font-normal">{country}</p>
                <p className="font-Worksans font-medium text-base mt-4">{numberDialed}</p>
              </div>
              <img src={Tele_Force_Images.Transfer_LOGO} width={32} height={32} alt="transfer_logo" className="mb-14" />
              <div className="flex flex-col items-center">
                <img src={Tele_Force_Images.RINGING} width={100} height={100} alt="ringing" />
                <p className="font-Worksans font-normal">{transferName}</p>
                <p className="font-Worksans font-medium text-base mt-4">{transferNumber}</p>
              </div>
            </div>
          </>
        ) : (
          <>
            <img src={Tele_Force_Images.RINGING} width={150} height={150} alt="ringing" className="ml-3" />
            <p className="font-Worksans font-medium">{transferName && transferName}</p>
            <p className="font-Worksans font-medium text-2xl mt-4">{numberDialed}</p>
          </>
        )}

        {session && session.remoteStream && (
          <div className={transferCall && 'mt-10'}>
            <CallTimer />
          </div>
        )}
      </div>
      {session && session.remoteStream ? (
        <OnGoingFeatures />
      ) : (
        <>
          <div className="text-center">
            <p className="font-Worksans font-medium text-xl mt-4 text-gray-500">{t('Calling')}</p>
          </div>
        </>
      )}
      <div className={session && session.remoteStream ? 'mt-7 cursor-pointer p-5 bg-[#EA4335] rounded-full' : 'mt-60 cursor-pointer p-5 bg-[#EA4335] rounded-full'}>
        <img src={Tele_Force_Images.CALL_END} width="32px" height="32px" alt="cancel" onClick={closeHandler} />
      </div>
    </div>
  );
};

CallRinging.propTypes = {
  session: PropTypes.object,
  transferUri: PropTypes.string,
  sipCaller: PropTypes.object.isRequired,
  setTransferUri: PropTypes.func.isRequired,
};

const mapStateToProps = (state: any) => ({
  transferUri: state.user.transferUri,
  session: state.sessions[state.userStatus.currentSession],
});

const mapDispatchToProps = (dispatch: any) => ({
  setTransferUri: (transferUri: any) => dispatch(stateActions.setTransferUri({ transferUri })),
});

export default WithSipCallerContext(connect(mapStateToProps, mapDispatchToProps)(CallRinging));
