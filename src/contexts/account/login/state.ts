const notImplemented = () => {
  console.error('Method not implemented');
};

export default class LoginState {
  username?: string;
  password?: string;
  isEnabledAppleSignIn: boolean = false;
  actions: {
    register: Function;
    forgotPassword: Function;
    signInWithApple: Function;
    signInWithAnonymously: Function;
    signInWithGoogle: Function;
  } = {
    register: notImplemented,
    forgotPassword: notImplemented,
    signInWithApple: notImplemented,
    signInWithAnonymously: notImplemented,
    signInWithGoogle: notImplemented,
  };
}
