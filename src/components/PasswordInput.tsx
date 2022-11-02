import React, { useState } from 'react';

interface IPropType {
  icon?: string;
  placeholder?: string;
  infoIcon?: string;
  value?: string;
  name?: string;
  onChange?: any;
}

const PasswordInput = ({ icon, placeholder, infoIcon, value, name, onChange }: IPropType) => {
  const [passwordShown, setPasswordShown] = useState<boolean>(false);

  const togglePassword = (e: any): void => {
    e.preventDefault();
    setPasswordShown(!passwordShown);
  };
  return (
    <div>
      <div className="w-[328px] h-[48px] flex items-center m-auto mt-4 p-3 gap-4 border-2 border-border rounded-lg ">
        <img src={`${icon}`} width={20} height={19} alt={icon} />
        <input
          type={passwordShown ? 'text' : 'password'}
          placeholder={placeholder}
          value={value}
          name={name}
          onChange={onChange}
          style={{
            width: '276px',
            height: '24px',
            border: 'none',
            lineHeight: '24px',
            fontSize: '16px',
            color: '#C4C4C4',
            marginTop: '5px',
            outline: 'none',
          }}
        />
        {infoIcon && (
          <button onClick={togglePassword}>
            <img src={`${infoIcon}`} width={20} height={19} alt={infoIcon} className="cursor-pointer" />
          </button>
        )}
      </div>
    </div>
  );
};

export default PasswordInput;
