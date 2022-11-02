/* eslint-disable @typescript-eslint/restrict-plus-operands */
import React, { useState, useEffect } from 'react';
import { setCallTimer } from '../store/slices/Call/callSession';
import { useAppDispatch, useAppSelector } from './hooks/hook';

const CallTimer = () => {
  const [time, setTime] = useState<number>(0);
  const callTime = useAppSelector((state: any): boolean => state.callSlice.callTimer);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setCallTimer(true));
    let interval: any;
    if (callTime) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    } else if (!callTime) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [callTime]);
  return (
    <div className="stopwatch">
      <div className="numbers">
        <span>{('0' + Math.floor(time / 3600)).slice(-2)}:</span>
        <span>{('0' + Math.floor((time / 60) % 60)).slice(-2)}:</span>
        <span>{('0' + Math.floor(time % 60)).slice(-2)}</span>
      </div>
    </div>
  );
};

export default CallTimer;
