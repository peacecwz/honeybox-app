import * as React from 'react';
import RegisterContext from '../../contexts/account/register/context';
import RegisterState from '../../contexts/account/register/state';
import RegisterScreen from '../../screens/account/register.screen';
import BaseContainer from '../base-container';
import t from '../../utils/i18n';
import database from '@react-native-firebase/database';
import {firebase} from '@react-native-firebase/auth';
import '@react-native-firebase/database';
import {Alert} from 'react-native';

export interface Props {}

export default class RegisterContainer extends BaseContainer<
  Props,
  RegisterState
> {
  constructor(props: any) {
    super(props);
    const state = new RegisterState();
    state.actions.goBack = this.goBack.bind(this);
    state.actions.register = this.register.bind(this);
    this.state = state;
  }

  async register() {
    try {
      const {email, password, fullName, birthDate, acceptPrivacy} = this.state;

      if (email === '' || password === '' || fullName === '') {
        this.alert(t('Please fill the form'));
        return;
      }

      if (!acceptPrivacy) {
        this.alert(t('Please accept privacy form'));
        return;
      }

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
        Alert.alert(t('HoneyApp'), t('Your registration successfully'), [
          {
            text: t('Ok'),
            onPress: () => this.goBack(),
          },
        ]);
      } else {
        this.alert(t('Cannot register to app'));
      }
    } catch (e) {
      this.alert(t('Cannot register to app'));
    }
  }

  render() {
    return (
      <RegisterContext.Provider value={this.state}>
        <RegisterScreen />
      </RegisterContext.Provider>
    );
  }
}
