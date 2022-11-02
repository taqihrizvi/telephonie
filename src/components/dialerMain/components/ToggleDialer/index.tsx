import React from 'react';
import { useStore } from '../../store';
import { Button } from './atoms';

const index = () => {
  const [opened, dispatch] = useStore((state: any) => state.dialerOpened);

  const toggleDialer = (e: any) => {
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();

    if (opened) {
      dispatch({ type: 'DIALER_CLOSE' });
    } else {
      dispatch({ type: 'DIALER_OPEN' });
    }
  };
  return (
    <Button opened={opened} onClick={toggleDialer}>
      {opened && 'opened'}
      {!opened && 'closed'}
    </Button>
  );
};

export default index;
