const notImplemented = () => {
  console.error('Method not implemented');
};

export default class RegisterState {
  passwordVisible: boolean = false;
  acceptPrivacy: boolean = false;
  fullName?: string;
  email: string = '';
  password: string = '';
  birthDate?: string;
  actions: {
    register: Function;
    goBack: Function;
  } = {
    register: notImplemented,
    goBack: notImplemented,
  };
}
