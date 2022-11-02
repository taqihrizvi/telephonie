import React from 'react';
import BackNavigation from '../../components/BackNavigation';
import { useTranslation } from 'react-i18next';
import Divider from '../../components/Divider';
import { H2 } from '../../components/Text';

const TermsAndCondition = () => {
  const { t } = useTranslation();
  return (
    <div className="w-[360px] ">
      <div className="mt-2">
        <div className="">
          <BackNavigation />
          <div className="m-auto ml-16 -mt-12">
            <H2>{t('Terms_services')}</H2>
          </div>
          <Divider customClass="m-auto -mt-3">_______________________________________________</Divider>
        </div>
      </div>
      <div className="relative mx-5">
        <p className="mt-2 text-[#6E7191] text-sm">{t('Dummy_terms')}</p>
        <p className="mt-2 text-[#6E7191] text-sm">{t('Dummy_terms')}</p>
      </div>
    </div>
  );
};

export default TermsAndCondition;
