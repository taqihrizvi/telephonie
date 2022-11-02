import React, { useState, MouseEvent } from 'react';
import { useTranslation } from 'react-i18next';
import Divider from '../../components/Divider';
import { useAppSelector, useAppDispatch } from '../../components/hooks/hook';
import Switch from '../../components/Switch';
import { H2 } from '../../components/Text';
import { Tele_Force_Images } from '../../config/images';
import { setAddnewAccount, setTermsAndCondition } from '../../store/slices/UI/Setting';
import { DummyAccounts } from '../../utility';

const Settings = () => {
  const [enabled, setEnabled] = useState<boolean>(false);
  const [showMyAccounts, setSHowMyAccounts] = useState<boolean>(false);
  const active = useAppSelector((state: any): boolean => state.dialerSlice.activeView);
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const name: string = 'Jhony den'; // for temporary use it will removed when sip server running
  const mail: string = '@jhony123'; // for temporary use it will removed when sip server running
  const number: string = '1212121212'; // for temporary use it will removed when sip server running

  const SwitchEnabled = (e: MouseEvent): void => {
    e.preventDefault();
    setEnabled(!enabled);
  };

  const myAccountHandler = (e: MouseEvent): void => {
    e.preventDefault();
    setSHowMyAccounts(!showMyAccounts);
  };

  return (
    <div className="z-10">
      <H2>{t('Settings')}</H2>
      <div className={!active ? ' h-[500px]' : ' h-[500px] overflow-y-auto'}>
        <div className="relative flex flex-col justify-center items-center">
          <img src={Tele_Force_Images.AVATAR} width="80px" height="80px" alt="userAvatar" />
          {enabled && (
            <div className="absolute top-0 right-32">
              <img src={Tele_Force_Images.ONILNE_BADGE} width="16px" height="16px" alt="userAvatar" />
            </div>
          )}

          <div className={!active ? ' invisible' : 'mt-1 text-center visible'}>
            <H2>{name}</H2>
            <p className="-mt-2">{mail}</p>
          </div>
        </div>
        <div className={!active ? 'invisible' : 'visible text-sm'}>
          <div className="makeActive">
            <div className={'flex justify-between mt-2'}>
              <p className="text-[#1F2024] font-normal text-sm mt-1.5">{t('Make_Active')}</p>
              <Switch onClick={SwitchEnabled} enabled={enabled} />
            </div>
            <Divider customClass="-mt-2">_______________________________________________________</Divider>
          </div>

          <div className="addNewAccount py-2">
            <div className="flex justify-between cursor-pointer" onClick={() => dispatch(setAddnewAccount(true))}>
              <p className="text-[#1F2024] font-normal text-sm">{t('Add_New_Account')}</p>
              <img src={Tele_Force_Images.RIGHT_BUTTON} width="12px" height="12px" className="mr-7" />
            </div>
            <Divider customClass="-mt-2">_______________________________________________________</Divider>
          </div>

          <div className="addNewAccount py-1 cursor-pointer" onClick={myAccountHandler}>
            <div className="flex justify-between">
              <p className="text-[#1F2024] font-normal text-sm">{t('My_Account')}</p>
              <div className="w-6 h-6 mr-6 flex justify-center items-center bg-Btn rounded-full text-white font-medium">{DummyAccounts.length}</div>
            </div>

            <Divider customClass="-mt-2">_______________________________________________________</Divider>
          </div>

          {showMyAccounts && (
            <>
              {DummyAccounts.map((account) => (
                <>
                  <li key={account.id} className="relative list-none flex justify-between py-1.5">
                    <div className="flex justify-end">
                      <div className="flex">
                        <img src={account.Avatar} width="24px" height="24px" />
                        <div className="flex flex-col ml-2.5">
                          <div className="flex">
                            <p className="text-[#4E4B66] font-Worksans text-xs font-normal tracking-normal">{account.name}</p>
                            {account.online && <img src={Tele_Force_Images.ONILNE_BADGE} width="12px" height="12px" className="ml-2" />}
                          </div>

                          <p className="text-[#6E7191] font-Worksans font-medium text-xs tracking-wide">{account.number}</p>
                        </div>
                      </div>
                      <div className="absolute right-6 top-4 flex ">
                        <img src={Tele_Force_Images.PENCIL} width="18px" height="18px" alt="pencil" className="cursor-pointer" />
                        <img src={Tele_Force_Images.Eye} width="18px" height="18px" alt="pencil" className="ml-3 cursor-pointer" />
                      </div>
                    </div>
                  </li>
                  <Divider customClass="-mt-2">_______________________________________________________</Divider>
                </>
              ))}
            </>
          )}

          <div className="addNewAccount py-1">
            <div className="flex justify-between">
              <p className="text-[#1F2024] font-normal text-sm">{t('help')}</p>
              <img src={Tele_Force_Images.RIGHT_BUTTON} width="12px" height="12px" className="mr-7 cursor-pointer" />
            </div>
            <Divider customClass="-mt-2">_______________________________________________________</Divider>
          </div>

          <div className="addNewAccount py-1">
            <div className="flex justify-between">
              <p className="text-[#1F2024] font-normal text-sm">{t('Privacy_Policy')}</p>
              <img src={Tele_Force_Images.RIGHT_BUTTON} width="12px" height="12px" className="mr-7 cursor-pointer" />
            </div>
            <Divider customClass="-mt-2">_______________________________________________________</Divider>
          </div>

          <div className="addNewAccount ">
            <p className="text-[#1F2024] font-normal text-sm">{t('Device_Name')}</p>
            <p className="text-[#0083B8] font-normal text-md">{number}</p>
            <Divider customClass="-mt-2">_______________________________________________________</Divider>
          </div>

          <div className="addNewAccount py-1 cursor-pointer">
            <div className="flex justify-between" onClick={() => dispatch(setTermsAndCondition(true))}>
              <p>{t('Terms_services')}</p>
              <img src={Tele_Force_Images.RIGHT_BUTTON} width="12px" height="12px" className="mr-7" />
            </div>
            <Divider customClass="-mt-2">_______________________________________________________</Divider>
          </div>

          <div className="addNewAccount py-1">
            <p className="text-[#0083B8] font-normal text-base">{t('Delete_account')}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
