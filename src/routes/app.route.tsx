import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {ChallengeDetailRoutePath} from './route.path';
import t from '../utils/i18n';
import ChallengeDetailContainer from '../containers/tab/challenges/challenge-detail.container';
import {SafeAreaView} from 'react-native';
const AppStack = createStackNavigator();

export default class AppRoute extends React.Component {
  render() {
    return (
      <React.Fragment>
        <SafeAreaView style={{flex: 0, backgroundColor: 'white'}} />

        <AppStack.Navigator headerMode={'none'}>
          <AppStack.Screen
            name={ChallengeDetailRoutePath}
            options={{
              title: t('Challenge Detail'),
            }}
            component={ChallengeDetailContainer}
          />
        </AppStack.Navigator>
      </React.Fragment>
    );
  }
}
