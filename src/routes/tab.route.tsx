import * as React from 'react';
import {
  CalendarRoutePath,
  ChallengesRoutePath,
  HomeRoutePath,
  ProfileRoutePath,
} from './route.path';
import t from '../utils/i18n';
import HomeContainer from '../containers/home/home.container';
import CalendarScreen from '../screens/calendar/calender-screen';
import ProfileContainer from '../containers/profile/profile.container';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import ChallengesContainer from '../containers/challenges/challenges.container';
import {SafeAreaView} from 'react-native';

const HomeTab = createBottomTabNavigator();

export default class TabRoute extends React.Component {
  render() {
    return (
      <HomeTab.Navigator>
        <HomeTab.Screen
          name={HomeRoutePath}
          options={{
            title: t('Home'),
          }}
          component={HomeContainer}
        />
        <HomeTab.Screen
          name={CalendarRoutePath}
          options={{
            title: t('Calendar'),
          }}
          component={CalendarScreen}
        />
        <HomeTab.Screen
          name={ChallengesRoutePath}
          options={{
            title: t('Challenges'),
          }}
          component={ChallengesContainer}
        />
        <HomeTab.Screen
          name={ProfileRoutePath}
          options={{
            title: t('Profile'),
          }}
          component={ProfileContainer}
        />
      </HomeTab.Navigator>
    );
  }
}
