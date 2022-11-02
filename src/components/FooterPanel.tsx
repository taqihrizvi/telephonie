import React, { StyleHTMLAttributes, useEffect, useState, MouseEvent } from 'react';
import { setdialerButton } from '../store/slices/UI/callingButton';
import { setActiveDialer } from '../store/slices/UI/Dialer';
import { setActiveView } from '../store/slices/UI/footerMenu';
import { useAppSelector, useAppDispatch } from './hooks/hook';

interface IPropType {
  customClassName?: string;
  customStyle?: StyleHTMLAttributes<HTMLDivElement>;
  imageSource?: string;
  activeImageSource?: string;
  title?: string;
  index?: number;
}
const FooterPanel = ({ index = 0, customClassName = '', imageSource, title, activeImageSource, customStyle = {} }: IPropType) => {
  const [active, setActive] = useState('');
  const footerMenuState = useAppSelector((state: any): number => state.footerMenu.activeView);
  const activeDialer = useAppSelector((state: any): number => state.activeDialer);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (footerMenuState === index) {
      setActive('active');
    } else {
      setActive('');
    }
  }, [footerMenuState]);

  const handleClick = (event: MouseEvent<HTMLElement>): void => {
    event.preventDefault();
    setActive('active');
    dispatch(setActiveView(index));
    dispatch(setActiveDialer(!activeDialer));
    dispatch(setdialerButton(false));
  };

  return (
    <div onClick={handleClick}>
      <div>
        <img src={active === 'active' ? activeImageSource : imageSource} width={24} height={24} alt="user" className="ml-1 cursor-pointer " />
        <p className={active === 'active' ? 'text-[#108ABC] font-Worksans text-[12px]' : 'text-[#C4C4C4] font-Worksans text-[12px]'}>{title}</p>
      </div>
    </div>
  );
};

export default FooterPanel;
