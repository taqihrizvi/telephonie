import React from 'react';

import { H2 as tH2, Label as label } from '../theme/typography';

const classMap: any = {
  primary1: 'text-primary1',
  primary2: 'text-primary2',
  primaryhover: 'hover:text-primaryHover',
  secondary1: 'text-secondary1',
  secondary2: 'text-secondary2',
  accent1: 'text-accent1',
  accent2: 'text-accent2',
  accent3: 'text-accent3',
  error: 'text-error',
  disabled1: 'text-disabled1',
  disabled2: 'text-disabled2',
  white: 'text-white',
};

const setProps = (props: any) => {
  let className = '';
  const filterdProps: any = {};
  for (const prop in props) {
    // eslint-disable-next-line no-prototype-builtins
    if (classMap.hasOwnProperty(prop)) {
      className = `${className} ${classMap[prop]}`;
      continue;
    }
    filterdProps.prop = props[prop];
  }
  filterdProps.className = `${className} ${props.className}`;
  return { ...props, ...filterdProps };
};

export const H2 = (props: any) => {
  const { children } = props;
  return (
    <h2 {...setProps(props)} style={tH2}>
      {children}
    </h2>
  );
};

export const Label = (props: any) => {
  const { children, p } = props;
  if (p)
    return (
      <p {...setProps(props)} style={label}>
        {children}
      </p>
    );
  return (
    <span {...setProps(props)} style={label}>
      {children}
    </span>
  );
};
