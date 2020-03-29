import * as React from 'react';
import {Button, Text, View} from 'react-native';
import LoginContext from '../../contexts/account/login/context';
import Container from '../../components/container';
import {AppleButton} from '@invertase/react-native-apple-authentication';
import {GoogleSigninButton} from '@react-native-community/google-signin';

export default class LoginScreen extends React.Component {
  constructor(props: any) {
    super(props);
  }

  render() {
    return (
      <LoginContext.Consumer>
        {state => (
          <Container>
            <Text>Login</Text>
            {state.isEnabledAppleSignIn ? (
              <AppleButton
                buttonStyle={AppleButton.Style.WHITE}
                buttonType={AppleButton.Type.SIGN_IN}
                style={{
                  width: 160,
                  height: 45,
                }}
                onPress={async () => await state.actions.signInWithApple()}
              />
            ) : (
              <View />
            )}
            <GoogleSigninButton
              style={{width: 192, height: 48}}
              size={GoogleSigninButton.Size.Wide}
              color={GoogleSigninButton.Color.Dark}
              onPress={async () => await state.actions.signInWithGoogle()}
            />
            <Button
              title={'Sign in with Anonymously'}
              onPress={async () => await state.actions.signInWithAnonymously()}
            />
          </Container>
        )}
      </LoginContext.Consumer>
    );
  }
}
