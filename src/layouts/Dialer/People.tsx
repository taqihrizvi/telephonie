import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';

import '../../styles/scroll.css';
import { H2 } from '../../components/Text';
import Search from '../../components/Search';
import { DummyContact } from '../../utility';
import { Tele_Force_Images } from '../../config/images';
import { WithSipCallerContext } from '../../sipCallerContext';
import { setActiveDialer } from '../../store/slices/UI/Dialer';
import * as stateActions from '../../components/actions/stateActions';
import { setdialerButton } from '../../store/slices/UI/callingButton';
import { useAppSelector, useAppDispatch } from '../../components/hooks/hook';
import { setApplyCalling, setTransferNumber } from '../../store/slices/Call/callSession';

const People = (props: any) => {
  const [searchItem, setSearchItem] = useState<string>('');
  const active = useAppSelector((state: any): boolean => state.dialerSlice.activeView);
  const transferCall = useAppSelector((state: any): string => state.callSlice.transferCall);
  const { sipCaller, session } = props;

  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const handleChange = (e: any): void => {
    e.preventDefault();
    setSearchItem(e.target.value);
    if (searchItem === '') {
      dispatch(setActiveDialer(true));
      dispatch(setdialerButton(false));
    }
  };

  const activateCall = (num: string, name: string): void => {
    if (transferCall) {
      sipCaller.refer(session.sipSession, num);
      dispatch(setTransferNumber({ num, name }));
      dispatch(setApplyCalling(true));
    } else {
      sipCaller.invite(num);
      dispatch(setApplyCalling(true));
      dispatch(setActiveDialer(false));
    }
  };
  return (
    <div className="">
      <div className="h-12 w-[306px]">
        <H2>{t('Contact List')}</H2>
      </div>
      <div>
        <Search icon={Tele_Force_Images.SEARCH} placeholder={'Search'} name={'search'} value={searchItem} onChange={handleChange} />
      </div>
      <div className={!active ? 'z-0 w-[340px] invisible overflow-y-hidden' : 'visible overflow-y-auto h-[500px] '}>
        {DummyContact.filter((abc: any) => abc.name.includes(searchItem)).map((contact) => (
          <>
            <li key={contact.id} className="list-none flex justify-between py-2">
              <div className="flex">
                <img src={contact.img} width="60px" height="60px" />
                <div className="flex flex-col ml-3 mt-2">
                  <p className="text-[#4E4B66] font-Worksans text-base font-normal tracking-normal">{contact.name}</p>
                  <p className="text-[#6E7191] font-Worksans font-medium text-sm tracking-wide">{contact.number}</p>
                </div>
              </div>
              <div className="flex items-center cursor-pointer mr-4" onClick={() => activateCall(contact.number, contact.name)}>
                <img src={contact.cta} width="20px" height="20px" />
              </div>
            </li>
            <img src={Tele_Force_Images.HR} width="324px" height="1px" alt="hr" />
          </>
        ))}
      </div>
    </div>
  );
};

People.propTypes = {
  requestUri: PropTypes.string,
  transferUri: PropTypes.string,
  sipCaller: PropTypes.any.isRequired,
  registered: PropTypes.bool.isRequired,
  setRequestUri: PropTypes.func.isRequired,
};

const mapStateToProps = (state: any) => ({
  requestUri: state.user.requestUri,
  transferUri: state.user.transferUri,
  registered: state.userStatus.registered,
  session: state.sessions[state.userStatus.currentSession],
});

const mapDispatchToProps = (dispatch: any) => ({
  setRequestUri: (requestUri: any): String => dispatch(stateActions.setRequestUri({ requestUri })),
});

export default WithSipCallerContext(connect(mapStateToProps, mapDispatchToProps)(People));
