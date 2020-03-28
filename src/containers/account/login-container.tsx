import * as React from 'react';
import LoginScreen from '../../screens/account/login-screen';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-community/async-storage';
import {MainRoutePath, RegisterRoutePath} from '../../route.path';
import LoginContext from '../../contexts/account/login/context';
import LoginState from '../../contexts/account/login/state';
import {Alert} from 'react-native';
import t from '../../utils/i18n';

export interface Props {
  navigation: any;
}

export default class LoginContainer extends React.Component<Props, LoginState> {
  private readonly navigationManager: any;
  constructor(props: any) {
    super(props);
    this.navigationManager = props.navigation;
    this.login = this.login.bind(this);
    this.register = this.register.bind(this);
    this.state = {
      actions: {
        login: this.login,
        register: this.register,
        forgotPassword: this.forgotPassword,
      },
    };
  }

  async initAnonymousLogin() {
    try {
      const result = await auth().signInAnonymously();
      await AsyncStorage.setItem('isLoggedUser', 'true');
      console.log('Auth Result: ', JSON.stringify(result));
    } catch (e) {
      if (e.code === 'auth/operation-not-allowed') {
        console.log('Enable anonymous in your firebase console.');
      } else {
        console.error(e);
      }
    }
  }

  async login() {
    await this.initAnonymousLogin();
    this.navigationManager.navigate(MainRoutePath);
  }

  register() {
    this.navigationManager.navigate(RegisterRoutePath);
  }

  forgotPassword() {
    this.navigationManager.navigate(RegisterRoutePath);
  }

  render() {
    return (
      <LoginContext.Provider value={this.state}>
        <LoginScreen {...this.props} />
      </LoginContext.Provider>
    );
  }
}
