import * as React from 'react';
import {
  ActivitiesRoutePath,
  ChallengesRoutePath,
  HomeRoutePath,
  ProfileRoutePath,
} from './route.path';
import t from '../utils/i18n';
import HomeContainer from '../containers/tab/home/home.container';
import ProfileContainer from '../containers/tab/profile/profile.container';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import ChallengesContainer from '../containers/tab/challenges/challenges.container';
import ActivitiesContainer from '../containers/tab/activities/activities.context';
import {SafeAreaView} from 'react-native';
import {BottomNavigation, BottomNavigationTab} from '@ui-kitten/components';
import {
  CalendarIcon,
  GridIcon,
  HomeIcon,
  PersonIcon,
  ProfileIcon,
} from '../components/icons';

const HomeTab = createBottomTabNavigator();

class BottomBarNavigation extends React.Component {
  render() {
    const {navigation, state}: any = this.props;
    return (
      <React.Fragment>
        <BottomNavigation
          selectedIndex={state.index}
          onSelect={index => navigation.navigate(state.routeNames[index])}>
          <BottomNavigationTab title={t('Home')} icon={HomeIcon} />
          <BottomNavigationTab title={t('Activities')} icon={CalendarIcon} />
          <BottomNavigationTab title={t('Challenges')} icon={GridIcon} />
          <BottomNavigationTab title={t('Profile')} icon={PersonIcon} />
        </BottomNavigation>
        <SafeAreaView style={{flex: 0, backgroundColor: 'white'}} />
      </React.Fragment>
    );
  }
}

export default class TabRoute extends React.Component {
  render() {
    return (
      <React.Fragment>
        <SafeAreaView style={{flex: 0, backgroundColor: 'white'}} />
        <HomeTab.Navigator tabBar={props => <BottomBarNavigation {...props} />}>
          <HomeTab.Screen
            name={HomeRoutePath}
            options={{
              title: t('Home'),
            }}
            component={HomeContainer}
          />
          <HomeTab.Screen
            name={ActivitiesRoutePath}
            options={{
              title: t('Activities'),
            }}
            component={ActivitiesContainer}
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
      </React.Fragment>
    );
  }
}
