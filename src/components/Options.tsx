import React, { MouseEvent } from 'react';

interface IPropType {
  imageSource: string;
  title: string;
  onClick?: (event: MouseEvent) => void;
}

const Options = ({ imageSource, title, onClick }: IPropType) => {
  return (
    <div className="w-[340px] m-auto mt-4">
      <div className="grid justify-items-center px-2 py-5 gap-1 drop-shadow-lg  m-1" onClick={onClick}>
        <img src={imageSource} width={40} height={40} alt="user" className="cursor-pointer flex justify-center text-center" />
        <p className={'text-[#666666] font-Worksans text-[12px]'}>{title}</p>
      </div>
    </div>
  );
};

export default Options;
