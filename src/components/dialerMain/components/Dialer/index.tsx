import React, { useEffect, useState } from 'react';
import { useStore } from '../../store';
import { Box, Button, Input, ButtonsContainer, CallButton } from './atoms';
import { useTranslation } from 'react-i18next';

const index = ({ props }: any) => {
  const [number, setNumber] = useState('');
  const [state, dispatch] = useStore();
  const buttons = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '*', '0', '#'];
  const { t } = useTranslation();

  useEffect(() => {
    document.addEventListener('click', onOuterClick);

    return () => document.removeEventListener('click', onOuterClick);
  });

  const onOuterClick = () => {
    dispatch({ type: 'DIALER_CLOSE' });
  };

  const onDialerClick = (e: any) => {
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
  };

  return (
    <Box opened={state.dialerOpened} onClick={onDialerClick}>
      <Input
        placeholder="SIP URI"
        value={number}
        onChange={(event: any) => {
          props.userSetRequestUri(event.target.value);
          setNumber(event.target.value);
        }}
        onKeyPress={(ev: any) => {
          if (ev.key === 'Enter') {
            ev.preventDefault();
            props.userSipCaller.invite(number);
          }
        }}
      />

      <ButtonsContainer>
        {buttons.map((char: string) => (
          <Button variant="contained" color="primary" key={char} onClick={() => setNumber(number + char)}>
            {char}
          </Button>
        ))}
      </ButtonsContainer>

      <CallButton
        onClick={() => {
          props.userSipCaller.invite(number);
          dispatch({ type: 'DIALER_CLOSE' });
        }}
      >
        {t('Call')}
      </CallButton>
    </Box>
  );
};

export default index;
