import React from 'react';
import { StoreCtx } from '../../store';

const StoreProvider = ({ reducer, initialState, children }: any) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  return <StoreCtx.Provider value={{ state, dispatch }}>{children}</StoreCtx.Provider>;
};

export default StoreProvider;
