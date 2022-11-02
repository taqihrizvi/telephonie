import React from 'react';
import { TextBtn } from '../theme/typography';
export const Button = ({ children, className, onClick, disabled, transparent = false }: any) => {
  return (
    <button
      className={`text-white font-extrabold bg-Btn px-6 py-3 rounded-lg
      ${className && className}
      ${transparent === true ? 'bg-opacity-100 hover:bg-primaryHover hover:text-white' : 'bg-primary2 hover:bg-primaryHover'}
      ${disabled ? ' bg-disable text-[#AAAAAA] cursor-not-allowed ' : ''}
    `}
      style={{ ...TextBtn }}
      type="button"
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
