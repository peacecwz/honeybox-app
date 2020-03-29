import * as React from 'react';
import {Text} from 'react-native';
import LoginContext from '../../contexts/account/login/context';
import Container from '../../components/container';

export default class RegisterScreen extends React.Component {
  constructor(props: any) {
    super(props);
  }

  render() {
    return (
      <LoginContext.Consumer>
        {() => (
          <Container>
            <Text>Register</Text>
          </Container>
        )}
      </LoginContext.Consumer>
    );
  }
}
