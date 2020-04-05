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

const AccountTab = createStackNavigator();

export default class AccountRoute extends React.Component {
  render() {
    return (
      <AccountTab.Navigator headerMode={'none'}>
        <AccountTab.Screen
          name={LoginRoutePath}
          options={{
            title: t('Login'),
          }}
          component={LoginContainer}
        />
        <AccountTab.Screen
          name={RegisterRoutePath}
          options={{
            title: t('Register'),
          }}
          component={RegisterContainer}
        />
        <AccountTab.Screen
          name={ForgotPasswordRoutePath}
          options={{
            title: t('Forgot Password'),
          }}
          component={ForgotPasswordContainer}
        />
      </AccountTab.Navigator>
    );
  }
}
