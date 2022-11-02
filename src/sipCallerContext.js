import React from 'react';

const SipCallerContext = React.createContext();

export default SipCallerContext;

export const WithSipCallerContext = (Component) => {
  // eslint-disable-next-line react/display-name
  return (props) => <SipCallerContext.Consumer>{(sipCaller) => <Component {...props} sipCaller={sipCaller} />}</SipCallerContext.Consumer>;
};
