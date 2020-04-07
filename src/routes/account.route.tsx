import * as React from 'react';
import {
  ForgotPasswordRoutePath,
  LoginRoutePath,
  RegisterRoutePath,
} from './route.path';
import t from '../utils/i18n';
import LoginContainer from '../containers/account/login.container';
import RegisterContainer from '../containers/account/register.container';
import ForgotPasswordContainer from '../containers/account/forgot-password.container';
import {createStackNavigator} from '@react-navigation/stack';

const AccountStack = createStackNavigator();

export default class AccountRoute extends React.Component {
  render() {
    return (
      <AccountStack.Navigator mode={'modal'} headerMode={'none'}>
        <AccountStack.Screen
          name={LoginRoutePath}
          options={{
            title: t('Login'),
            headerShown: false,
          }}
          component={LoginContainer}
        />
        <AccountStack.Screen
          name={RegisterRoutePath}
          options={{
            title: t('Register'),
            headerShown: false,
          }}
          component={RegisterContainer}
        />
        <AccountStack.Screen
          name={ForgotPasswordRoutePath}
          options={{
            title: t('Forgot Password'),
            headerShown: false,
          }}
          component={ForgotPasswordContainer}
        />
      </AccountStack.Navigator>
    );
  }
}
