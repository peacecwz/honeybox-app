import * as React from 'react';
import {View} from 'react-native';
import {
  Button,
  CheckBox,
  Input,
  StyleService,
  Text,
} from '@ui-kitten/components';
import {ImageOverlay} from '../../components/image-overlay';
import {KeyboardAvoidingView} from '../../components/keyboard-avoding-view';
import RegisterContext from '../../contexts/account/register/context';
import t from '../../utils/i18n';
import {
  EmailIcon,
  EyeIcon,
  EyeOffIcon,
  PersonIcon,
} from '../../components/icons';
import {SignUpBackground} from '../../components/background-images';

export default class RegisterScreen extends React.Component {
  constructor(props: any) {
    super(props);
  }

  render() {
    return (
      <RegisterContext.Consumer>
        {state => (
          <KeyboardAvoidingView>
            <ImageOverlay style={styles.container} source={SignUpBackground}>
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
                  autoCapitalize="none"
                  placeholder={t('Full Name')}
                  icon={PersonIcon}
                  onChangeText={text => (state.fullName = text)}
                />
                <Input
                  style={styles.formInput}
                  status="control"
                  autoCapitalize="none"
                  placeholder="Email"
                  icon={EmailIcon}
                  onChangeText={text => (state.email = text)}
                />
                <Input
                  style={styles.formInput}
                  status="control"
                  autoCapitalize="none"
                  secureTextEntry={!state.passwordVisible}
                  placeholder="Password"
                  icon={state.passwordVisible ? EyeIcon : EyeOffIcon}
                  onChangeText={text => (state.password = text)}
                  onIconPress={() =>
                    (state.passwordVisible = !state.passwordVisible)
                  }
                />
                <CheckBox
                  style={styles.termsCheckBox}
                  textStyle={styles.termsCheckBoxText}
                  text={t('I read and agree to Terms & Conditions')}
                />
              </View>
              <Button
                style={styles.signUpButton}
                size="giant"
                onPress={() => state.actions.register()}>
                {t('SIGN UP')}
              </Button>
              <Button
                style={styles.signInButton}
                appearance="ghost"
                status="control"
                onPress={() => state.actions.goBack()}>
                {t('Already have an account? Sign In')}
              </Button>
            </ImageOverlay>
          </KeyboardAvoidingView>
        )}
      </RegisterContext.Consumer>
    );
  }
}

const styles = StyleService.create({
  container: {
    flex: 1,
    backgroundColor: 'background-basic-color-1',
  },
  headerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 216,
  },
  profileAvatar: {
    width: 116,
    height: 116,
    borderRadius: 58,
    alignSelf: 'center',
    backgroundColor: 'background-basic-color-1',
    tintColor: 'text-hint-color',
  },
  editAvatarButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  signInLabel: {
    marginTop: 16,
  },
  formContainer: {
    flex: 1,
    paddingTop: 32,
    paddingHorizontal: 16,
  },
  formInput: {
    marginTop: 16,
  },
  termsCheckBox: {
    marginTop: 24,
  },
  termsCheckBoxText: {
    color: 'white',
  },
  signUpButton: {
    marginHorizontal: 16,
  },
  signInButton: {
    marginVertical: 12,
    marginHorizontal: 16,
  },
});
