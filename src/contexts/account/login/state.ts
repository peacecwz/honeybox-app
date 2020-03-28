const notImplemented = () => {
  console.error('Method not implemented');
};

export default class LoginState {
  username?: string;
  password?: string;
  actions: {
    login: Function;
    register: Function;
    forgotPassword: Function;
  } = {
    login: notImplemented,
    register: notImplemented,
    forgotPassword: notImplemented,
  };
}
