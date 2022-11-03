import React, { MouseEvent, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Divider from '../../components/Divider';
import Options from '../../components/Options';
import { Tele_Force_Images } from '../../config/images';
import * as stateActions from '../../components/actions/stateActions';
import { setActiveDialer } from '../../store/slices/UI/Dialer';
import { setActiveView } from '../../store/slices/UI/footerMenu';
import { useAppDispatch, useAppSelector } from '../../components/hooks/hook';
import { setApplyCalling, setTransferCall } from '../../store/slices/Call/callSession';
import { WithSipCallerContext } from '../../sipCallerContext';

const OnGoingFeatures = (props: any) => {
  const [number, setNumber] = useState<string>('');
  const active = useAppSelector((state: any): boolean => state.dialerSlice.activeView);
  const numbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '+', '0', '#'];
  const { sipCaller, session } = props;

  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const openDialer = () => {
    dispatch(setActiveDialer(true));
  };

  const transferCallHandler = () => {
    dispatch(setTransferCall(true));
    dispatch(setApplyCalling(false));
    dispatch(setActiveDialer(!active));
    dispatch(setActiveView(0));
  };

  const removeHandler = (e: MouseEvent<HTMLElement>): void => {
    e.preventDefault();
    setNumber(number.slice(0, -1));
  };

  const holdHandler = () => {
    sipCaller.toggleMyMedia(session, 'audio', !session.sipSession.localAudioMuted);
  };

  const pausePlayHandler = () => {
    sipCaller.toggleMedia(session, 'audio', !session.remoteAudioMuted);
  };

  return (
    <div className="w-full">
      {!active && <Divider customClass="m-auto">_______________________________________________</Divider>}
      {active ? (
        <>
          <div className="bg-white">
            {number === '' && (
              <div className="flex justify-center cursor-pointer mt-2" onClick={() => dispatch(setActiveDialer(false))}>
                <img src="Assests/Line.png" width="52px" height="auto" alt="line" />
              </div>
            )}
            {number !== '' && (
              <div className="flex flex-col -mt-12 z-50 ">
                <div className="flex justify-center cursor-pointer mt-1" onClick={() => dispatch(setActiveDialer(false))}>
                  <img src="Assests/Line.png" width="52px" height="auto" alt="line" />
                </div>

                <div className="w-[328px] h-[40px] flex items-center m-auto  mb-1 p-3 gap-4 border-border rounded-lg">
                  <input type="text" name="number" value={number} className="m-auto font-Worksans p-2 w-[240px] h-[33px] border-none leading-8 tracking-wider text-3xl font-normal outline-none" />
                  <img src={Tele_Force_Images.BACK_SPACE} width="24px" height="24px" alt="backspace" className="cursor-pointer" onClick={removeHandler} />
                </div>
              </div>
            )}
            {number !== '' && <Divider customClass="m-auto -mt-3">______________________________________________</Divider>}
            <div className="w-[340px] m-auto mt-2 ">
              {numbers.map((char: string) => (
                <button color="primary" key={char} onClick={() => setNumber(number + char)} className="w-[100px] h-[60px] m-1.5 font-semibold text-xl border-[2px] border-border rounded-md  ">
                  {char}
                </button>
              ))}
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="flex justify-evenly ml-3  ">
            <Options imageSource={Tele_Force_Images.Record} title={t('Start rec')} />
            <Options imageSource={session.localAudioMuted ? Tele_Force_Images.BLUE_MICROPHONE : Tele_Force_Images.MICRO_PHONE} title={session.localAudioMuted ? t('UnMute') : t('Mute')} onClick={holdHandler} />
            <Options imageSource={session.remoteAudioMuted ? Tele_Force_Images.BlUE_PLAY : Tele_Force_Images.PAUSE} title={session.remoteAudioMuted ? t('Play') : t('Hold')} onClick={pausePlayHandler} />
          </div>
          <div className="flex ml-3 ">
            <Options imageSource={Tele_Force_Images.DOTS_NINE} title={t('Keypad')} onClick={openDialer} />
            <Options imageSource={Tele_Force_Images.USER_PLUS} title={t('Add Call')} />
            <Options imageSource={Tele_Force_Images.TRANSFER_CALL} title={t('Transfer')} onClick={transferCallHandler} />
          </div>
        </>
      )}
    </div>
  );
};

OnGoingFeatures.protoTypes = {
  sipCaller: PropTypes.object.isRequired,
};

const mapStateToProps = (state: any) => ({
  session: state.sessions[state.userStatus.currentSession],
  transferUri: state.user.transferUri,
});

const mapDispatchToProps = (dispatch: any) => ({
  setTransferUri: (transferUri: any) => dispatch(stateActions.setTransferUri({ transferUri })),
});

export default WithSipCallerContext(connect(mapStateToProps, mapDispatchToProps)(OnGoingFeatures));
