import {Platform} from 'react-native';
import BaseState from '../../base-state';

const notImplemented = () => {
  console.error('Method not implemented');
};

export default class LoginState extends BaseState {
  email: string = '';
  password: string = '';
  isEnabledAppleSignIn: boolean = Platform.OS === 'ios';
  passwordVisible: boolean = false;
  actions: {
    register: Function;
    forgotPassword: Function;
    signInWithApple: Function;
    signInWithAnonymously: Function;
    signInWithGoogle: Function;
    signInWithEmail: Function;
  } = {
    register: notImplemented,
    forgotPassword: notImplemented,
    signInWithApple: notImplemented,
    signInWithAnonymously: notImplemented,
    signInWithGoogle: notImplemented,
    signInWithEmail: notImplemented,
  };
}
