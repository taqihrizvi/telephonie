import React from 'react';

const StoreCtx = React.createContext({});

function reducer(state, action) {
  switch (action.type) {
    case 'DIALER_OPEN':
      return { ...state, dialerOpened: true };
    case 'DIALER_CLOSE':
      return { ...state, dialerOpened: false };
    default:
      console.error(`StoreError - Unknow type(${action.type})`);
      return state;
  }
}

// Create hook
function useStore(stateFn) {
  const context = React.useContext(StoreCtx);
  let state = context.state;
  const dispatch = context.dispatch;

  // Redux thunk
  async function newDispatch(fn) {
    if (typeof fn === 'function') {
      let action = fn();

      if (action instanceof Promise) {
        action = await action;
      }

      dispatch(action);
    } else {
      dispatch(fn);
    }
  }

  if (typeof stateFn === 'function') {
    state = stateFn(state);
  }

  return [state, newDispatch];
}

export { StoreCtx, reducer, useStore };
