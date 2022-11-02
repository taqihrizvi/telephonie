import React from 'react';
import { Dialer_Routes } from '../Interfaces';
import FooterPanel from './FooterPanel';
import { useTranslation } from 'react-i18next';
import { Tele_Force_Images } from '../config/images';

const Footer = () => {
  const { t } = useTranslation();
  return (
    <div className="absolute bottom-0 w-full h-[75px] flex justify-between items-center  border-t-2 border-t-gray-50 z-20 bg-white">
      <div className="flex justify-evenly w-[50%]">
        <FooterPanel index={Dialer_Routes.PEOPLE} title={t('default:People')} imageSource={Tele_Force_Images.USER_OFF} activeImageSource={Tele_Force_Images.USERS} />
        <FooterPanel index={Dialer_Routes.HISTORY} title={t('default:History')} imageSource={Tele_Force_Images.CLOCK_COUNTER} activeImageSource={Tele_Force_Images.COLORED_CLOCKED} />
      </div>
      <div className="flex justify-evenly w-[50%]">
        <FooterPanel index={Dialer_Routes.SETTING} title={t('default:Setting')} imageSource={Tele_Force_Images.GEAR} activeImageSource={Tele_Force_Images.GEAR_BLUE} />
        <FooterPanel index={Dialer_Routes.HELP} title={t('default:Help')} imageSource={Tele_Force_Images.QUESTION} activeImageSource={Tele_Force_Images.QUESTION_BLUE} />
      </div>
    </div>
  );
};

export default Footer;
