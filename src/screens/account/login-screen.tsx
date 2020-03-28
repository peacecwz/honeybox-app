import * as React from 'react';
import {Button, Text, View} from 'react-native';
import LoginContext from '../../contexts/account/login/context';
import t from '../../utils/i18n';

export default class LoginScreen extends React.Component {
  constructor(props: any) {
    super(props);
  }

  render() {
    return (
      <LoginContext.Consumer>
        {state => (
          <View
            style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Text>Login Page</Text>
            <View>
              <Text
                style={{
                  fontSize: 16,
                  marginBottom: 8,
                }}>
                The following Firebase modules are pre-installed:
              </Text>
              <Button
                title={t('Go to home')}
                onPress={() => state.actions.login()}
              />
              <Button
                title={t('Set username')}
                onPress={() => (state.username = `1,${state.username}`)}
              />
            </View>
          </View>
        )}
      </LoginContext.Consumer>
    );
  }
}
