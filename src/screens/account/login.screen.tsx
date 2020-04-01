import * as React from 'react';
import {StyleSheet, View} from 'react-native';
import {Button, Input, Text} from '@ui-kitten/components';
import LoginContext from '../../contexts/account/login/context';
import t from '../../utils/i18n';
import {ImageOverlay} from '../../components/image-overlay';
import {
  AppleIcon,
  EyeIcon,
  EyeOffIcon,
  GoogleIcon,
  PersonIcon,
} from '../../components/icons';
import {SignInBackground} from '../../components/background-images';
import {KeyboardAvoidingView} from '../../components/keyboard-avoding-view';

export default class LoginScreen extends React.Component {
  constructor(props: any) {
    super(props);
  }

  render() {
    return (
      <LoginContext.Consumer>
        {state => (
          <KeyboardAvoidingView>
            <ImageOverlay style={styles.container} source={SignInBackground}>
              <View style={styles.headerContainer}>
                <Text category="h1" status="control">
                  {t('Hello')}
                </Text>
                <Text style={styles.signInLabel} category="s1" status="control">
                  {t('Sign in to your account')}
                </Text>
              </View>
              <View style={styles.formContainer}>
                <Input
                  status="control"
                  placeholder={t('Email')}
                  icon={PersonIcon}
                  onChangeText={text => (state.email = text)}
                />
                <Input
                  style={styles.passwordInput}
                  status="control"
                  placeholder={t('Password')}
                  icon={state.passwordVisible ? EyeIcon : EyeOffIcon}
                  secureTextEntry={!state.passwordVisible}
                  onIconPress={() => {
                    state.passwordVisible = !state.passwordVisible;
                    console.log(
                      `Password Visible Status: ${state.passwordVisible}`,
                    );
                  }}
                  onChangeText={text => (state.password = text)}
                />
                <View style={styles.forgotPasswordContainer}>
                  <Button
                    style={styles.forgotPasswordButton}
                    appearance="ghost"
                    status="control"
                    onPress={() => state.actions.forgotPassword()}>
                    {t('Forgot your password?')}
                  </Button>
                </View>
              </View>
              <Button
                style={styles.signInButton}
                size="giant"
                onPress={() => state.actions.signInWithEmail()}>
                {t('SIGN IN')}
              </Button>
              <View style={styles.socialAuthContainer}>
                <Text style={styles.socialAuthHintText} status="control">
                  {t('Or Sign In using Social Media')}
                </Text>
                <View style={styles.socialAuthButtonsContainer}>
                  <Button
                    appearance="ghost"
                    status="control"
                    size="giant"
                    icon={GoogleIcon}
                    onPress={() => state.actions.signInWithGoogle()}
                  />
                  {state.isEnabledAppleSignIn ? (
                    <Button
                      appearance="ghost"
                      status="control"
                      size="giant"
                      icon={AppleIcon}
                      onPress={() => state.actions.signInWithApple()}
                    />
                  ) : (
                    <View />
                  )}
                </View>
              </View>
              <Button
                style={styles.signUpButton}
                appearance="ghost"
                status="control"
                onPress={() => state.actions.register()}>
                {t("Don't have an account? Sign Up")}
              </Button>
            </ImageOverlay>
          </KeyboardAvoidingView>
        )}
      </LoginContext.Consumer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    minHeight: 216,
    justifyContent: 'center',
    alignItems: 'center',
  },
  formContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
  signInLabel: {
    marginTop: 16,
  },
  passwordInput: {
    marginTop: 16,
  },
  signInButton: {
    marginHorizontal: 16,
  },
  forgotPasswordContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  forgotPasswordButton: {
    paddingHorizontal: 0,
  },
  signUpButton: {
    marginVertical: 12,
  },
  socialAuthContainer: {
    marginTop: 32,
  },
  socialAuthButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  socialAuthHintText: {
    alignSelf: 'center',
    marginBottom: 16,
  },
});
