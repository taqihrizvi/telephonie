import React, { useState, MouseEvent } from 'react';

import Divider from './Divider';
import { Tele_Force_Images } from '../config/images';
import { setActiveDialer } from '../store/slices/UI/Dialer';
import { useAppSelector, useAppDispatch } from './hooks/hook';
import { setdialerButton } from '../store/slices/UI/callingButton';
import { setApplyCalling, setDialerNumber } from '../store/slices/Call/callSession';

const Dial = (props: any) => {
  const [number, setNumber] = useState<string>('');
  const active = useAppSelector((state: any): boolean => state.dialerSlice.activeView);
  const callingButton = useAppSelector((state: any): boolean => state.callButton.dialerNumber);
  const numbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '+', '0', '#'];
  const { userSipCaller, userSetRequestUri } = props;
  const dispatch = useAppDispatch();

  const activateCall = () => {
    userSipCaller?.invite(number);
    dispatch(setApplyCalling(true));
    dispatch(setDialerNumber(number));
  };
  const removeHandler = (e: MouseEvent<HTMLElement>): void => {
    e.preventDefault();
    setNumber(number.slice(0, -1));
    if (number === '') {
      dispatch(setdialerButton(false));
    }
  };

  return (
    <div className="">
      {number === '' || !callingButton ? (
        <div className="absolute bottom-12 left-36 grid justify-items-center  w-[64px] h-[64px] items-center cursor-pointer z-50 rounded-full bg-Btn">
          <img src={active ? Tele_Force_Images.DOTS_NINE_BLUE : Tele_Force_Images.DOTS_NINE_WHITE} width="28px" height="28px" alt="btn" onClick={() => dispatch(setActiveDialer(!active))} />
        </div>
      ) : (
        <div className="absolute bottom-12 left-36 grid justify-items-center  w-[64px] h-[64px] items-center cursor-pointer z-50 rounded-full bg-CallBtn" onClick={activateCall}>
          <img src={Tele_Force_Images.PHONE} width="28px" height="28px" alt="btn" />
        </div>
      )}

      {!active && (
        <div className="z-50 bg-white ">
          <div className="w-[328px] h-[48px] flex items-center m-auto mb-1 p-3 gap-4 border-border rounded-lg">
            <input
              type="text"
              name="number"
              value={number}
              className="m-auto font-Worksans p-2 w-[240px] h-[33px] border-none leading-8 tracking-normal text-3xl font-normal outline-none"
              onKeyPress={(ev) => {
                if (ev.key === 'Enter') {
                  ev.preventDefault();
                  userSipCaller.invite(number);
                }
              }}
              onChange={(event) => {
                userSetRequestUri(event.target.value);
              }}
            />
            <img src={Tele_Force_Images.BACK_SPACE} width="24px" height="24px" alt="backspace" className="cursor-pointer" onClick={removeHandler} />
          </div>
          <Divider customClass="m-auto -mt-3">______________________________________________</Divider>
          <div className="w-[340px] m-auto mt-4" onClick={() => dispatch(setdialerButton(true))}>
            {numbers.map((char: string) => (
              <button color="primary" key={char} onClick={() => setNumber(number + char)} className="w-[100px] h-[64px] m-1.5 font-semibold text-xl border-[2px] border-border rounded-md ">
                {char}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dial;
