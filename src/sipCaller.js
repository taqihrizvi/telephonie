/* eslint-disable no-unused-vars */
import * as sip from 'sip.js';
import * as stateActions from './components/actions/stateActions';
import * as requestActions from './components/actions/requestActions';
import * as sessionStates from './sessionStates';
import Logger from './logger';

const simpleUser = require('sip.js');

const logger = new Logger('SipCaller');

let store;

export default class SipCaller {
  /**
   * @param  {Object} data
   * @param  {Object} data.store - The Redux store.
   */
  static init(data) {
    store = data.store;
  }

  constructor() {
    logger.debug('constructor()');
    this._ua = null;
    this._init();
  }

  _init() {
    logger.debug('_init()');
    const { autoRegister } = store.getState().user;
    if (autoRegister) this.register();
  }

  register() {
    logger.debug('register()');

    const { displayName, sipUri, password, outboundProxy } = store.getState().user;

    // This is inserted in config.js in index.html
    const iceServers = window.iceServers;

    store.dispatch(stateActions.setRegisterInProgress());

    this._ua = new sip.UA({
      uri: sipUri,
      password,
      displayName,
      transportOptions: {
        wsServers: [outboundProxy],
        traceSip: true,
      },
      sessionDescriptionHandlerFactoryOptions: {
        peerConnectionOptions: {
          rtcConfiguration: {
            iceServers,
          },
        },
      },
    });

    this._ua.on('registered', () => {
      logger.debug('Registered');

      store.dispatch(
        requestActions.notify({
          type: 'success',
          text: 'Successfully registered.',
        })
      );

      store.dispatch(stateActions.setRegistrationMessage({ registrationMessage: 'Success' }));
      store.dispatch(stateActions.setRegistered({ registered: true }));
    });

    this._ua.on('registrationFailed', (response, cause) => {
      logger.debug('Registration failed [cause: %s]', cause);

      store.dispatch(
        requestActions.notify({
          type: 'error',
          text: `Registration failed: ${cause}`,
        })
      );

      store.dispatch(stateActions.setRegistrationMessage({ registrationMessage: cause }));
      store.dispatch(stateActions.setRegistered({ registered: false }));
    });

    this._ua.on('unregistered', (response, cause) => {
      logger.debug('Unregistered [cause: %s]', cause);

      store.dispatch(
        requestActions.notify({
          text: `Unregistered: ${cause}`,
        })
      );

      store.dispatch(stateActions.setRegistrationMessage({ registrationMessage: cause }));
      store.dispatch(stateActions.setRegistered({ registered: false }));
    });

    this._ua.on('invite', (sipSession) => {
      logger.debug('Incoming invite [sipSession: %o]', sipSession);

      store.dispatch(
        requestActions.notify({
          text: `Incoming call from: ${sipSession.remoteIdentity.uri.user}`,
        })
      );
      this._handleSession(sipSession, sessionStates.INCOMING);
    });
  }

  unRegister() {
    logger.debug('unRegister()');

    this._ua.unregister();
  }

  _handleSession(sipSession, direction) {
    logger.debug('_handleSession() [sipSession: %o]', sipSession);

    const startTime = Date.now();

    sipSession?.on('trackAdded', () => {
      logger.debug('SipSession trackAdded [sipSession: %o]', sipSession);

      const pc = sipSession.sessionDescriptionHandler.peerConnection;

      // Gets remote tracks
      const remoteStream = new MediaStream();

      pc.getReceivers().forEach((receiver) => {
        if (receiver.track) remoteStream.addTrack(receiver.track);
      });

      store.dispatch(stateActions.addRemoteStream({ sipSession, remoteStream }));

      // Gets local tracks
      const localStream = new MediaStream();

      pc.getSenders().forEach((sender) => {
        if (sender.track) localStream.addTrack(sender.track);
      });

      store.dispatch(stateActions.addLocalStream({ sipSession, localStream }));
    });

    sipSession.on('replaced', (newSipSession) => {
      logger.debug('SipSession replaced [oldSipSession: %o, newSipSession: %o]', sipSession, newSipSession);

      this._handleSession(newSipSession, direction);
    });

    sipSession.on('referRequested', (context) => {
      // Outgoing REFER
      if (context instanceof sip.ReferClientContext) {
        context.on('referRequestAccepted', () => {
          store.dispatch(
            stateActions.setSessionState({
              sipSession,
              sessionState: sessionStates.REFER_REQUEST_ACCEPTED,
            })
          );
        });

        context.on('referRequestRejected', () => {
          store.dispatch(
            stateActions.setSessionState({
              sipSession,
              sessionState: sessionStates.REFER_REQUEST_REJECTED,
            })
          );
        });
      }

      // Incoming REFER
      if (context instanceof sip.ReferServerContext) {
        context.accept();
      }
    });

    sipSession.on('directionChanged', () => {
      const newDirection = sipSession.sessionDescriptionHandler.getDirection();

      if (newDirection === 'sendrecv') {
        logger.debug('SipSession not on hold [sipSession: %o]', sipSession);
      } else {
        logger.debug('SipSession on hold [sipSession: %o]', sipSession);
      }
    });

    sipSession.on('progress', (response) => {
      logger.debug('SipSession progress [response: %o, sipSession: %o]', response, sipSession);

      store.dispatch(
        stateActions.setSessionState({
          sipSession,
          sessionState: sessionStates.PROGRESS,
        })
      );
    });

    sipSession.on('accepted', (data) => {
      logger.debug('SipSession accepted [data: %o, sipSession: %o]', data, sipSession);

      store.dispatch(
        stateActions.setSessionState({
          sipSession,
          sessionState: sessionStates.ACCEPTED,
        })
      );
    });

    sipSession.on('bye', (request) => {
      logger.debug('SipSession bye [request: %o, sipSession: %o]', request, sipSession);

      store.dispatch(
        stateActions.setSessionState({
          sipSession,
          sessionState: sessionStates.TERMINATED,
        })
      );
    });

    sipSession.on('cancel', () => {
      logger.debug('SipSession canceled [sipSession: %o]', sipSession);

      store.dispatch(
        stateActions.setSessionState({
          sipSession,
          sessionState: sessionStates.CANCELED,
        })
      );
    });

    sipSession.on('rejected', (response, cause) => {
      logger.debug('SipSession rejected [response: %o, cause: %s, sipSession: %o]', response, cause, sipSession);

      store.dispatch(
        stateActions.setSessionState({
          sipSession,
          sessionState: sessionStates.REJECTED,
        })
      );
    });

    sipSession.on('failed', (response, cause) => {
      logger.debug('SipSession failed [response: %o, cause: %s, sipSession: %o]', response, cause, sipSession);

      store.dispatch(
        stateActions.setSessionState({
          sipSession,
          sessionState: sessionStates.FAILED,
        })
      );
    });

    sipSession.on('terminated', (message, cause) => {
      logger.debug('SipSession terminated [message: %o, cause: %s, sipSession: %o]', message, cause, sipSession);

      store.dispatch(
        requestActions.notify({
          text: `Call terminated: ${sipSession.remoteIdentity.uri.user}`,
        })
      );

      store.dispatch(
        stateActions.setSessionState({
          sipSession,
          sessionState: sessionStates.TERMINATED,
        })
      );

      const displayName = sipSession.remoteIdentity.displayName || sipSession.remoteIdentity.uri.user;
      const sipUri = sipSession.remoteIdentity.uri.toString();

      store.dispatch(
        stateActions.addSessionToHistory({
          displayName,
          sipUri,
          direction,
          startTime,
        })
      );

      setTimeout(() => {
        logger.debug('SipSession removed [sipSession: %o]', sipSession);

        store.dispatch(stateActions.removeSession({ sipSession }));

        if (!store.getState().userStatus.currentSession) {
          const sessions = store.getState().sessions;

          if (sessions) {
            store.dispatch(
              stateActions.setCurrentSession({
                currentSession: Object.keys(sessions)[0],
              })
            );
          }
        }
      }, 3000);
    });

    store.dispatch(stateActions.addSession({ sipSession, direction }));
  }

  accept(sipSession) {
    logger.debug('accept() [sipSession: %o]', sipSession);

    const { videoEnabled } = store.getState().user;

    sipSession.accept({
      sessionDescriptionHandlerOptions: {
        constraints: {
          audio: true,
          video: videoEnabled,
        },
      },
    });
  }

  terminate(sipSession) {
    logger.debug('terminate() [sipSession: %o]', sipSession);

    sipSession.terminate();
  }

  invite(sipUri) {
    logger.debug('invite() [sipUri: %s]', sipUri);

    // const { videoEnabled } = store.getState().user;

    const sipSession = this._ua?.invite(sipUri, {
      sessionDescriptionHandlerOptions: {
        constraints: {
          audio: true,
          video: false,
          hold: false,
        },
      },
      inviteWithoutSdp: true,
    });
    this._handleSession(sipSession, sessionStates.OUTGOING);
    store?.dispatch(
      stateActions?.setCurrentSession({
        currentSession: sipSession?.request?.callId,
      })
    );
  }

  refer(sipSession, sipUri) {
    logger.debug('refer() [sipSession: %o, sipUri: %s]', sipSession, sipUri);
    sipSession.refer(sipUri);
  }

  toggleMedia(sipSession, type, mute) {
    logger.debug('toggleMedia() [sipSession: %o, type: %s, mute: %s]', sipSession, type, mute);

    const callId = sipSession.request.callId;
    const remoteStream = store.getState().sessions[callId].remoteStream;
    const localStream = store.getState().sessions[callId].localStream;

    if (!remoteStream) return;

    if (type === 'audio') {
      remoteStream.getAudioTracks()[0].enabled = !mute;

      store.dispatch(
        stateActions.toggleRemoteAudio({
          sipSession,
        })
      );
    } else if (type === 'video') {
      const { videoEnabled, sipUri, displayName } = store.getState().user;
      store.dispatch(
        stateActions.toggleRemoteVideo({
          sipSession,
        })
      );
      // remoteStream.getVideoTracks()[0].enabled = !mute;
      // sipSession.hold();
      const server = 'wss://3frontoffice.nr.tre.se';
      const aor = 'sip:device.a23995751@3kontaktpartnernr.dk';
      const authorizationUsername = 'device.a23995751';
      const authorizationPassword = 'Arooj123';
      const { Web } = simpleUser;
      const { Simple } = Web;

      const main = {
        sipUri: 'sip:00923310041873@3kontaktpartnernr.dk',
        traceSip: true,
        sessionDescriptionHandlerOptions: {
          constraints: {
            audio: true,
            video: false,
            hold: true,
          },
        },
        inviteWithoutSdp: true,
        media: {
          remote: {
            audio: remoteStream,
            video: remoteStream,
          },
          local: {
            audio: localStream,
            video: localStream,
          },
        },
        ua: this._ua,
      };
      const test = {
        media: {
          remote: {
            audio: remoteStream,
            video: remoteStream,
          },
          local: {
            audio: localStream,
            video: localStream,
          },
        },
        ua: this._ua,
      };
      const options = {
        server,
        aor,
        media: {
          remote: {
            audio: remoteStream,
            video: remoteStream,
          },
          local: {
            audio: localStream,
            video: localStream,
          },
        },
        userAgentOptions: {
          authorizationPassword,
          authorizationUsername,
        },
        ua: this._ua,
      };

      // commented code will be used in near future
      // const { SimpleUser, SimpleUserOptions } = require("sip.js/lib/platform/web");
      // testUser.hold(sipUri, test);

      // store.dispatch(
      // 	stateActions.toggleRemoteAudio({
      // 		sipSession
      // 	})
      // );
      const testUser = new Simple(options);
      testUser.state = 'STATUS_CONNECTED';
      testUser.session = sipSession;
      testUser.ua = this._ua;
      testUser.options = main;
      // commented code will be used in near future
      // testUser.mute();
      testUser.hold({
        sessionDescriptionHandlerOptions: {
          constraints: {
            audio: true,
            video: false,
            hold: true,
          },
        },
        inviteWithoutSdp: true,
      });

      if (videoEnabled) {
        sipSession.hold(main);
        // commented code will be used in near future
        // store.dispatch()
        // store.dispatch(stateActions.setRegisterInProgress());

        // store.dispatch(
        //     stateActions.TOGGLE_VIDEO({
        //         videoEnabled
        //     })
        // );
      } else {
        sipSession.unhold(main);
      }
      // commented code will be used in near future
      // sipSession.setRemoteDescription(new RTCSessionDescription(main));
      // sipSession.hold(test);
    } else {
      throw new Error('Unknown media type.');
    }
  }

  holdToggleMedia(session, type, mute) {
    const sipSession = session.sipSession;
    logger.debug('toggleMedia() [sipSession: %o, type: %s, mute: %s]', sipSession, type, mute);

    const callId = sipSession.request.callId;
    const remoteStream = store.getState().sessions[callId].remoteStream;
    const localStream = store.getState().sessions[callId].localStream;

    if (!remoteStream) return;

    if (type === 'audio') {
      remoteStream.getAudioTracks()[0].enabled = !mute;

      store.dispatch(
        stateActions.toggleRemoteAudio({
          sipSession,
        })
      );
    } else if (type === 'video') {
      const { videoEnabled, sipUri, displayName } = store.getState().user;
      store.dispatch(
        stateActions.toggleRemoteVideo({
          sipSession,
        })
      );
      // commented code will be used in near future
      // remoteStream.getVideoTracks()[0].enabled = !mute;
      // sipSession.hold();
      const server = 'wss://3frontoffice.nr.tre.se';
      const aor = 'sip:device.a23995751@3kontaktpartnernr.dk';
      const authorizationUsername = 'device.a23995751';
      const authorizationPassword = 'Arooj123';
      const { Web } = simpleUser;
      const { Simple } = Web;

      const main = {
        sipUri: 'sip:00923310041873@3kontaktpartnernr.dk',
        traceSip: true,
        sessionDescriptionHandlerOptions: {
          constraints: {
            audio: true,
            video: false,
          },
        },
        inviteWithoutSdp: true,
        media: {
          remote: {
            audio: remoteStream,
            video: remoteStream,
          },
          local: {
            audio: localStream,
            video: localStream,
          },
        },
        ua: this._ua,
      };
      const test = {
        media: {
          remote: {
            audio: remoteStream,
            video: remoteStream,
          },
          local: {
            audio: localStream,
            video: localStream,
          },
        },
        ua: this._ua,
      };
      const options = {
        server,
        aor,
        media: {
          remote: {
            audio: remoteStream,
            video: remoteStream,
          },
          local: {
            audio: localStream,
            video: localStream,
          },
        },
        userAgentOptions: {
          authorizationPassword,
          authorizationUsername,
        },
        ua: this._ua,
      };
      // commented code will be used in near future
      // const { SimpleUser, SimpleUserOptions } = require("sip.js/lib/platform/web");
      // testUser.hold(sipUri, test);

      // store.dispatch(
      // 	stateActions.toggleRemoteAudio({
      // 		sipSession
      // 	})
      // );
      const testUser = new Simple(options);
      testUser.state = 'STATUS_CONNECTED';
      testUser.session = sipSession;
      testUser.ua = this._ua;
      testUser.options = main;
      // commented code will be used in near future
      // testUser.mute();
      testUser.hold({
        inviteWithoutSdp: true,
      });
      // commented code will be used in near future
      // {session.remoteVideoMuted ?
      //     <MusicOffIcon />
      //     :
      //     <MusicNoteIcon />
      // }
      if (session.remoteVideoMuted) {
        // commented code will be used in near future
        // store.dispatch()
        // store.dispatch(stateActions.setRegisterInProgress());

        // store.dispatch(
        //     stateActions.TOGGLE_VIDEO({
        //         videoEnabled
        //     })
        // );
        sipSession.unhold(main);
      } else {
        sipSession.hold(main);
      }
      // commented code will be used in near future
      // sipSession.setRemoteDescription(new RTCSessionDescription(main));
      // sipSession.hold(test);
    } else {
      throw new Error('Unknown media type.');
    }
  }

  toggleMyMedia(session, type, mute) {
    logger.debug('toggleMyMedia() [session: %o, type: %s, mute: %s]', session, type, mute);

    if (type === 'audio') {
      session.localStream.getAudioTracks()[0].enabled = !mute;
    } else if (type === 'video') {
      session.localStream.getVideoTracks()[0].enabled = !mute;
    } else {
      throw new Error('Unknown media type.');
    }
  }
}
