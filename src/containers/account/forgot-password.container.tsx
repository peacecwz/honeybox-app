import * as React from 'react';
import BaseContainer from '../base-container';
import '@react-native-firebase/database';
import ForgotPasswordState from '../../contexts/account/forgot-password/state';
import ForgotPasswordContext from '../../contexts/account/forgot-password/context';
import ForgotPasswordScreen from '../../screens/account/forgot-password.screen';
import {firebase} from '@react-native-firebase/auth';
import t from '../../utils/i18n';

export interface Props {}

export default class ForgotPasswordContainer extends BaseContainer<
  Props,
  ForgotPasswordState
> {
  constructor(props: any) {
    super(props);
    this.forgotPassword = this.forgotPassword.bind(this);
    this.goBack = this.goBack.bind(this);
    this.state = {
      email: '',
      actions: {
        goBack: this.goBack,
        forgotPassword: this.forgotPassword,
      },
    };
  }

  async forgotPassword() {
    try {
      await firebase.auth().sendPasswordResetEmail(this.state.email);
      this.alert(`We sent reset email to ${this.state.email}`);
    } catch (e) {
      this.alert(t('An error occurred when send reset email'));
    }
  }

  render() {
    return (
      <ForgotPasswordContext.Provider value={this.state}>
        <ForgotPasswordScreen {...this.props} />
      </ForgotPasswordContext.Provider>
    );
  }
}
