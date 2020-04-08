import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {ChallengeDetailRoutePath} from './route.path';
import t from '../utils/i18n';
import ChallengeDetailContainer from '../containers/challenges/challenge-detail.container';
const AppStack = createStackNavigator();

export default class AppRoute extends React.Component {
  render() {
    return (
      <AppStack.Navigator>
        <AppStack.Screen
          name={ChallengeDetailRoutePath}
          options={{
            title: t('Challenge Detail'),
          }}
          component={ChallengeDetailContainer}
        />
      </AppStack.Navigator>
    );
  }
}
