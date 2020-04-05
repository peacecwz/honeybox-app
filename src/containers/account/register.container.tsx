import * as React from 'react';
import RegisterContext from '../../contexts/account/register/context';
import RegisterState from '../../contexts/account/register/state';
import RegisterScreen from '../../screens/account/register.screen';
import BaseContainer from '../base-container';
import {LoginRoutePath} from '../../routes/route.path';
import t from '../../utils/i18n';
import database from '@react-native-firebase/database';
import {firebase} from '@react-native-firebase/auth';
import '@react-native-firebase/database';

export interface Props {
  navigation: any;
}

export default class RegisterContainer extends BaseContainer<
  Props,
  RegisterState
> {
  constructor(props: any) {
    super(props);
    this.register = this.register.bind(this);
    this.state = {
      passwordVisible: false,
      birthDate: '',
      fullName: '',
      email: '',
      password: '',
      actions: {
        goBack: this.goBack,
        register: this.register,
      },
    };
  }

  async register() {
    try {
      const {email, password, fullName, birthDate} = this.state;
      const result = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password);

      const userId = result.user.uid;
      const ref = database().ref(`/users/${userId}`);

      await ref.set({
        email,
        userId,
        fullName,
        birthDate,
      });

      if (result && result.user) {
        this.navigate(LoginRoutePath);
      }
    } catch (e) {
      console.log(JSON.stringify(e));
      this.alert(t('Cannot register to app'));
    }
  }

  render() {
    return (
      <RegisterContext.Provider value={this.state}>
        <RegisterScreen {...this.props} />
      </RegisterContext.Provider>
    );
  }
}
