import React from 'react';
import { useTranslation } from 'react-i18next';

const Loading = () => {
  const { t } = useTranslation();

  return (
    <div className="bg-gradient-to-b from-[#0597d0] to-[#245e75] flex w-[360px] h-[780px] m-auto justify-center items-center">
      <div className=" text-white">{t('teleforce')}</div>
    </div>
  );
};

export default Loading;
