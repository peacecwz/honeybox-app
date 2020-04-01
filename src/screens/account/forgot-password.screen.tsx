import * as React from 'react';
import {StyleSheet, View} from 'react-native';
import {Button, Input, Text} from '@ui-kitten/components';
import t from '../../utils/i18n';
import {ImageOverlay} from '../../components/image-overlay';
import {EmailIcon} from '../../components/icons';
import {ForgotPasswordBackground} from '../../components/background-images';
import {KeyboardAvoidingView} from '../../components/keyboard-avoding-view';
import ForgotPasswordContext from '../../contexts/account/forgot-password/context';

export default class ForgotPasswordScreen extends React.Component {
  constructor(props: any) {
    super(props);
  }

  render() {
    return (
      <ForgotPasswordContext.Consumer>
        {state => (
          <KeyboardAvoidingView>
            <ImageOverlay
              style={styles.container}
              source={ForgotPasswordBackground}>
              <Text
                style={styles.forgotPasswordLabel}
                category="h4"
                status="control">
                {t('Forgot Password')}
              </Text>
              <Text style={styles.enterEmailLabel} status="control">
                {t('Please enter your email address')}
              </Text>
              <View style={styles.formContainer}>
                <Input
                  status="control"
                  placeholder={t('Email')}
                  icon={EmailIcon}
                  onChangeText={text => (state.email = text)}
                />
              </View>
              <Button
                size="giant"
                onPress={() => state.actions.forgotPassword()}>
                {t('RESET PASSWORD')}
              </Button>
              <Button
                style={styles.goBackButton}
                appearance="ghost"
                status="control"
                onPress={() => state.actions.goBack()}>
                {t('Go back')}
              </Button>
            </ImageOverlay>
          </KeyboardAvoidingView>
        )}
      </ForgotPasswordContext.Consumer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  formContainer: {
    flex: 1,
    justifyContent: 'space-between',
    marginTop: 24,
  },
  forgotPasswordLabel: {
    zIndex: 1,
    alignSelf: 'center',
    marginTop: 24,
  },
  enterEmailLabel: {
    zIndex: 1,
    alignSelf: 'center',
    marginTop: 64,
  },
  goBackButton: {
    marginVertical: 12,
    marginHorizontal: 16,
  },
});
