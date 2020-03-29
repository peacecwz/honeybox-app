const notImplemented = () => {
  console.error('Method not implemented');
};

export default class RegisterState {
  username?: string;
  email?: string;
  password?: string;
  birthDate?: string;
  actions: {
    register: Function;
  } = {
    register: notImplemented,
  };
}
