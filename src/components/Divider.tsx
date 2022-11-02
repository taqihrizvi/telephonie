import React, { MouseEvent } from 'react';

interface Props {
  width?: string;
  customClass?: string;
  children?: string;
  onClick?: (event: MouseEvent) => void;
}

const Divider = ({ width = '90%', customClass = '', children, onClick }: Props) => {
  const customStyle = { width };
  return (
    <div className={`divider ${customClass}`} style={customStyle} onClick={onClick}>
      <p className="text-gray-200 mx-[]">{children}</p>
    </div>
  );
};

export default Divider;
