import React from 'react';
import { Tele_Force_Images } from '../config/images';
import Time from './Time';

const Header = () => {
  return (
    <div className="fixed top-0 z-50 w-[360px] h-[47px] flex justify-between items-center bg-white">
      <div>
        <Time />
      </div>
      <img src={Tele_Force_Images.CONTAINER} width={100} height={100} />
    </div>
  );
};

export default Header;
