const notImplemented = () => {
  console.error('Method not implemented');
};

export default class ForgotPasswordState {
  email: string = '';
  actions: {
    forgotPassword: Function;
    goBack: Function;
  } = {
    forgotPassword: notImplemented,
    goBack: notImplemented,
  };
}
