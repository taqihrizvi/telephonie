import React, { MouseEvent, useState } from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { H2 } from '../../components/Text';
import Search from '../../components/Search';
import Divider from '../../components/Divider';
import { Tele_Force_Images } from '../../config/images';

import { setActiveDialer } from '../../store/slices/UI/Dialer';
import { setdialerButton } from '../../store/slices/UI/callingButton';
import * as stateActions from '../../components/actions/stateActions';
import { useAppDispatch, useAppSelector } from '../../components/hooks/hook';

const History = (props: any) => {
  const [allCalls, setAllCals] = useState<boolean>(true);
  const [searchItem, setSearchItem] = useState<string>('');
  const [assignedCalls, setAssignedCalls] = useState<boolean>(false);
  const active = useAppSelector((state: any): boolean => state.dialerSlice.activeView);
  const country: string = 'Denmark'; // for temporary use it will removed when we got name in sip response

  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const handleChange = (e: any): void => {
    e.preventDefault();
    setSearchItem(e.target.value);
    if (searchItem === '') {
      dispatch(setActiveDialer(true));
      dispatch(setdialerButton(false));
    }
  };

  const allCallHandler = (e: MouseEvent<HTMLElement>): void => {
    setAllCals(true);
    setAssignedCalls(false);
  };

  const assignedCallHandler = (e: MouseEvent<HTMLElement>): void => {
    setAssignedCalls(true);
    setAllCals(false);
  };

  return (
    <div>
      <div className="h-12 w-[306px]">
        <H2>{t('Call_History')}</H2>
      </div>
      <div>
        <Search icon={Tele_Force_Images.SEARCH} placeholder={'Search'} name={'search'} value={searchItem} onChange={handleChange} />
      </div>
      <div className="Tabs flex p-2">
        <div className={allCalls ? 'border-b-[3px] border-[#0083B8] py-1 text-[#0083B8] font-Worksans font-normal text-lg cursor-pointer' : 'py-1 font-Worksans font-normal text-lg cursor-pointer'} onClick={allCallHandler}>
          {t('All_calls')}
        </div>
        <div className={assignedCalls ? 'ml-4 border-b-[3px] border-[#0083B8] py-1 text-[#0083B8] font-Worksans font-normal text-lg cursor-pointer' : 'ml-4 py-1 font-Worksans font-normal text-lg cursor-pointer'} onClick={assignedCallHandler}>
          {t('Assigned_Calls')}
        </div>
      </div>
      {allCalls && (
        <div className={!active ? 'z-0 w-[340px] invisible overflow-y-hidden' : 'visible overflow-y-auto h-[500px] '}>
          {props.sessionHistory
            .filter((abc: any) => abc.displayName.includes(searchItem))
            .map((sessions: any, index: any) => (
              <>
                <li key={index} className="list-none flex justify-between py-3.5">
                  <div className="flex justify-center items-center">
                    <img src={Tele_Force_Images.History_Persons} width="53px" height="53px" className="rounded-full" />
                    <div>
                      <p className="ml-3 font-Worksans font-normal text-sm">{sessions.sipUri.slice(19)}</p>
                      <div className="flex">
                        <img src={sessions.direction === 'Symbol(OUTGOING)' ? Tele_Force_Images.OUTGOING_ARROW : Tele_Force_Images.OUTGOING_ARROW} width="16px" height="16px" alt="outgoing" className="ml-2" />
                        <p className="ml-1 font-Worksans font-normal text-sm">{sessions.displayName}</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-center items-start px-5 text-right">
                    <div className="mr-2 text-[#6E7191]">
                      <p className="text-xs font-medium tracking-normal font-Worksans mt-2">{moment(sessions.startTime).format('LT')}</p>
                      <p className="text-xs font-[12px] tracking-wide font-Worksans mt-1">{country}</p>
                    </div>
                    <div className="cursor-pointer mt-2.5">
                      <img src={Tele_Force_Images.INFORMATION_Blue} />
                    </div>
                  </div>
                </li>
                <Divider customClass="m-auto -ml-2 -mt-6">__________________________________________________</Divider>
              </>
            ))}
        </div>
      )}
    </div>
  );
};

History.propTypes = {
  sessionHistory: PropTypes.array.isRequired,
  setRequestUri: PropTypes.func.isRequired,
};

const mapStateToProps = (state: any) => ({
  sessionHistory: state.sessionHistory,
});

const mapDispatchToProps = (dispatch: any) => ({
  setRequestUri: (requestUri: any) => dispatch(stateActions.setRequestUri({ requestUri })),
});

export default connect(mapStateToProps, mapDispatchToProps)(History);
