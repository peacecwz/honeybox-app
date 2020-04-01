const notImplemented = () => {
  console.error('Method not implemented');
};

export default class LoginState {
  email: string = '';
  password: string = '';
  isEnabledAppleSignIn: boolean = false;
  passwordVisible: boolean = true;
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
