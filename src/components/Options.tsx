import React, { MouseEvent } from 'react';

interface IPropType {
  imageSource: string;
  title: string;
  onClick?: (event: MouseEvent) => void;
}

const Options = ({ imageSource, title, onClick }: IPropType) => {
  return (
    <div className="w-[340px] m-auto mt-4 mx-1">
      <div className="grid justify-items-center w-[88px] shadow rounded-sm py-5 m-1" onClick={onClick}>
        <img src={imageSource} width={30} height={30} alt="user" className="cursor-pointer flex justify-center text-center" />
        <p className={'text-[#666666] font-Worksans text-[12px]'}>{title}</p>
      </div>
    </div>
  );
};

export default Options;
