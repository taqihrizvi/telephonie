import React from 'react';

import { Tele_Force_Images } from '../config/images';

const BackNavigation = () => {
  return (
    <div className="relative w-[360px] h-[47px]">
      <img src={Tele_Force_Images.ARROW} width={16} height={12} alt="arrow" className="absolute top-4 left-5" />
    </div>
  );
};

export default BackNavigation;
