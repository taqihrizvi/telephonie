import React from 'react';

interface IPropType {
  mediaEncryption?: string[];
  transport?: string[];
}
const Select = ({ mediaEncryption, transport }: IPropType) => {
  return (
    <div>
      <select
        className="form-select form-select-lg mb-2 mt-2 appearance-none block w-[328px] px-4 py-2 text- font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat
      border-2 border-border rounded-lg
      transition
      ease-in-out
      m-auto
      focus:text-gray-700 focus:bg-white focus:border-border focus:outline-none"
        aria-label=".form-select-lg example"
      >
        {mediaEncryption
          ? mediaEncryption.map((options: string, id: number) => (
              <option key={id} value={options} className="w-[328px]">
                {options}
              </option>
            ))
          : transport &&
            transport.map((options: string, id: number) => (
              <option key={id} value={options} className="w-[328px]">
                {options}
              </option>
            ))}
      </select>
    </div>
  );
};

export default Select;
