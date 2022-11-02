import React, { MouseEvent, ChangeEvent } from 'react';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';

import PropTypes from 'prop-types';
import Select from '../../components/Select';
import Divider from '../../components/Divider';
import Input from '../../components/InputField';
import { Button } from '../../components/Button';
import { H2, Label } from '../../components/Text';
import PasswordInput from '../../components/PasswordInput';
import { WithSipCallerContext } from '../../sipCallerContext';
import * as stateActions from '../../components/actions/stateActions';
import { Tele_Force_Images } from '../../config/images';

const Registration = (props: any) => {
  const { sipCaller, displayName, sipUri, password, outboundProxy, setDisplayName, setSipUri, setPassword, setOutboundProxy } = props;

  const { t } = useTranslation();

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    e.preventDefault();
  };

  const handleRegister = (e: MouseEvent<HTMLElement>): void => {
    e.preventDefault();
    sipCaller.register();
  };

  const transport: string[] = ['UDP', 'TCP', 'UDP+TCP', 'TLS'];
  const mediaEncryption: string[] = ['Disables', 'Optional SRTP/ (RTP/AVP)', 'Mandatory SRTP/ (RTP/AVP)'];

  return (
    <>
      <div className="">
        <div className="w-[328px] h-[48px] m-auto ">
          <H2>{t('add_account')}</H2>
        </div>
        <div className="m-auto">
          <form>
            <Input placeholder={'Account name'} icon={Tele_Force_Images.MAN} name={'accountname'} onChange={handleChange} />
            <Input placeholder={'SIP server'} icon={Tele_Force_Images.SERVER} name={'sipServer'} value={sipUri} infoIcon={Tele_Force_Images.INFORMATION} onChange={(event: any) => setSipUri(event.target.value)} tooltip={t('tooltip_1')} />
            <Input placeholder={'SIP proxy'} icon={Tele_Force_Images.SERVER} name={'sipProxy'} infoIcon={Tele_Force_Images.INFORMATION} onChange={handleChange} tooltip={t('tooltip_2')} />
            <Divider customClass="mx-4 -mb-3">------------------------------------------------</Divider>
            <Input placeholder={'Username '} icon={Tele_Force_Images.MAN} name={'userName'} value={displayName} infoIcon={Tele_Force_Images.INFORMATION} onChange={(event: any) => setDisplayName(event.target.value)} tooltip={t('tooltip_3')} />
            <Input placeholder={'Domain'} icon={Tele_Force_Images.GLOBE} name={'domain'} value={outboundProxy} infoIcon={Tele_Force_Images.INFORMATION} onChange={(event: any) => setOutboundProxy(event.target.value)} tooltip={t('tooltip_4')} />
            <Input placeholder={'jhon.doe@gmail.com'} icon={Tele_Force_Images.MAIL} name={'email'} infoIcon={Tele_Force_Images.INFORMATION} onChange={handleChange} tooltip={t('tooltip_5')} />
            <PasswordInput placeholder={'Password 6-12 characters'} icon={Tele_Force_Images.LOCK} name={'password'} value={password} infoIcon={Tele_Force_Images.Eye} onChange={(event: any) => setPassword(event.target.value)} />
            <Divider customClass="mx-4 -mb-3">------------------------------------------------</Divider>
            <Input placeholder={'Display name'} icon={Tele_Force_Images.MAN} name={'displayName'} infoIcon={Tele_Force_Images.Eye} onChange={handleChange} tooltip={t('tooltip_6')} />
            <Divider customClass="mx-4 -mb-3">------------------------------------------------</Divider>
            <div className="mt-4">
              <Label className="p-4">{t('media_encryption')}</Label>
              <Select mediaEncryption={mediaEncryption} />
            </div>
            <div className="mt-4">
              <Label className="p-4">{t('transport')}</Label>
              <Select transport={transport} />
            </div>
            <Button
              disabled={displayName === null || sipUri === null || password === null || outboundProxy === null}
              className="justify-center w-[328px] m-auto mt-2 ml-4"
              onClick={(displayName !== null || sipUri !== null || password !== null || outboundProxy !== null) && handleRegister}
            >
              {t('register')}
            </Button>
          </form>
        </div>
      </div>
    </>
  );
};
Registration.propTypes = {
  sipCaller: PropTypes.any.isRequired,
  displayName: PropTypes.string,
  sipUri: PropTypes.string,
  password: PropTypes.string,
  outboundProxy: PropTypes.string,
  autoRegister: PropTypes.bool,
  setDisplayName: PropTypes.func.isRequired,
  setSipUri: PropTypes.func.isRequired,
  setPassword: PropTypes.func.isRequired,
  setOutboundProxy: PropTypes.func.isRequired,
  setAutoRegister: PropTypes.func.isRequired,
  // registered: PropTypes.bool.isRequired, //will be use in near future
  // classes: PropTypes.object.isRequired, //will be use in near future
};

const mapStateToProps = (state: any) => ({
  displayName: state.user.displayName,
  sipUri: state.user.sipUri,
  password: state.user.password,
  outboundProxy: state.user.outboundProxy,
  autoRegister: state.user.autoRegister,
  registered: state.userStatus.registered,
});
const mapDispatchToProps = (dispatch: any) => ({
  setDisplayName: (displayName: string): string => dispatch(stateActions.setDisplayName({ displayName })),
  setSipUri: (sipUri: any): string => dispatch(stateActions.setSipUri({ sipUri })),
  setPassword: (password: any): string => dispatch(stateActions.setPassword({ password })),
  setOutboundProxy: (outboundProxy: any): string => dispatch(stateActions.setOutboundProxy({ outboundProxy })),
  // setAutoRegister: (autoRegister) =>dispatch(stateActions.setAutoRegister({ autoRegister })), //will be use in near future
});
export default WithSipCallerContext(connect(mapStateToProps, mapDispatchToProps)(Registration));
