import React, { MouseEvent } from 'react';

interface IPropType {
  enabled: boolean;
  onClick: (event: MouseEvent) => void;
}

const Switch = ({ enabled, onClick }: IPropType) => {
  return (
    <div>
      <label className="inline-flex relative items-center mr-5 cursor-pointer">
        <input type="checkbox" className="sr-only peer" checked={enabled} readOnly />
        <div
          onClick={onClick}
          className="w-11 h-6 bg-gray-200 rounded-full peer  peer-focus:ring-[#0083B8]  peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#0083B8]"
        ></div>
      </label>
    </div>
  );
};

export default Switch;
