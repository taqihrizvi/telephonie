import React from 'react';
import Popper from './Popper';

interface IPropType {
  icon?: string;
  placeholder?: string;
  infoIcon?: string;
  value?: string;
  name?: string;
  onChange?: any;
  password?: boolean;
  tooltip?: string;
}

const Input = ({ icon, placeholder, infoIcon, value, name, onChange, tooltip }: IPropType) => {
  return (
    <div>
      <div className="w-[328px] h-[48px] flex items-center m-auto mb-1 mt-4 p-3 gap-4 border-2 border-border rounded-lg ">
        <img src={`${icon}`} width={20} height={19} alt={icon} />
        <input
          type="text"
          placeholder={placeholder}
          value={value}
          name={name}
          onChange={onChange}
          className={'font-Worksans'}
          style={{
            width: '276px',
            height: '24px',
            border: 'none',
            lineHeight: '24px',
            fontSize: '16px',
            fontWeight: '400px',
            marginTop: '5px',
            outline: 'none',
          }}
        />
        {infoIcon && <Popper tooltip={tooltip} />}
      </div>
    </div>
  );
};

export default Input;
