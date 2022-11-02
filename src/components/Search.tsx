import React from 'react';

interface IPropType {
  icon?: string;
  placeholder?: string;
  name?: string;
  value?: string;
  onChange?: (value: any) => void;
}

const Search = ({ icon, placeholder, name, onChange, value }: IPropType) => {
  return (
    <div>
      <div className="w-[328px] h-[48px] flex items-center m-auto mb-1 mt-4 p-3 gap-4 border-b-2 border-border rounded-lg ">
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
      </div>
    </div>
  );
};

export default Search;
