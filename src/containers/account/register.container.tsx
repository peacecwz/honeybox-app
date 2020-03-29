import * as React from 'react';
import RegisterContext from '../../contexts/account/register/context';
import RegisterState from '../../contexts/account/register/state';
import RegisterScreen from '../../screens/account/register.screen';
import BaseContainer from '../base-container';
import {RegisterRoutePath} from '../../route.path';
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
      actions: {
        register: this.register,
      },
    };
  }

  register() {
    this.navigate(RegisterRoutePath);
  }

  render() {
    return (
      <RegisterContext.Provider value={this.state}>
        <RegisterScreen {...this.props} />
      </RegisterContext.Provider>
    );
  }
}
