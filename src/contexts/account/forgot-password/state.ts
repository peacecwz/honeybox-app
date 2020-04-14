import BaseState from '../../base-state';

const notImplemented = () => {
  console.error('Method not implemented');
};

export default class ForgotPasswordState extends BaseState {
  email: string = '';
  actions: {
    forgotPassword: Function;
    goBack: Function;
  } = {
    forgotPassword: notImplemented,
    goBack: notImplemented,
  };
}
