import 'react-native-gesture-handler';
import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import LoginScreen from './screens/account/login.screen';
import CalendarScreen from './screens/calendar/calender-screen';
import EventsScreen from './screens/events/events-screen';
import ProfileScreen from './screens/profile/profile-screen';
import {NavigationState} from '@react-navigation/routers';
import analytics from '@react-native-firebase/analytics';
import {
  AccountRoutePath,
  CalendarRoutePath,
  EventsRoutePath,
  ForgotPasswordRoutePath,
  HomeRoutePath,
  LoginRoutePath,
  MainRoutePath,
  ProfileRoutePath,
  RegisterRoutePath,
} from './route.path';
import LoginContainer from './containers/account/login.container';
import t from './utils/i18n';
import HomeContainer from './containers/home/home.container';
import RegisterContainer from './containers/account/register.container';
import ForgotPasswordContainer from './containers/account/forgot-password.container';

const HomeStack = createStackNavigator();
const HomeTab = createBottomTabNavigator();
const AccountTab = createStackNavigator();

export interface Props {
  isLogged: boolean;
}

export default class Route extends React.Component<Props> {
  constructor(props: any) {
    super(props);
  }

  getRouteName() {
    return this.props.isLogged ? MainRoutePath : AccountRoutePath;
  }

  getAccountTabRoute() {
    return (
      <AccountTab.Navigator headerMode={'none'}>
        <AccountTab.Screen
          name={LoginRoutePath}
          options={{
            title: t('Login'),
          }}
          component={LoginContainer}
        />
        <AccountTab.Screen
          name={RegisterRoutePath}
          options={{
            title: t('Register'),
          }}
          component={RegisterContainer}
        />
        <AccountTab.Screen
          name={ForgotPasswordRoutePath}
          options={{
            title: t('Forgot Password'),
          }}
          component={ForgotPasswordContainer}
        />
      </AccountTab.Navigator>
    );
  }

  getTabRoute() {
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
          name={EventsRoutePath}
          options={{
            title: t('Events'),
          }}
          component={EventsScreen}
        />
        <HomeTab.Screen
          name={ProfileRoutePath}
          options={{
            title: t('Profile'),
          }}
          component={ProfileScreen}
        />
      </HomeTab.Navigator>
    );
  }

  render() {
    return (
      <NavigationContainer onStateChange={this.onStateChange}>
        <HomeStack.Navigator
          headerMode={'none'}
          initialRouteName={this.getRouteName()}>
          <HomeStack.Screen
            name={MainRoutePath}
            options={{
              title: t('HoneyApp'),
            }}
            component={this.getTabRoute}
          />
          <HomeStack.Screen
            name={AccountRoutePath}
            options={{
              title: t('Login'),
            }}
            component={this.getAccountTabRoute}
          />
          <HomeStack.Screen
            name={RegisterRoutePath}
            options={{
              title: t('Register'),
            }}
            component={LoginScreen}
          />
        </HomeStack.Navigator>
      </NavigationContainer>
    );
  }

  private async onStateChange(state: NavigationState | undefined) {
    if (!state) {
      return;
    }

    const currentState = state.routes[state.index];
    let pageName = currentState.name;

    if (
      currentState.state &&
      currentState.state.index &&
      currentState.state.index > -1
    ) {
      pageName = currentState.state.routes[currentState.state.index].name;
    }

    await analytics().logEvent('current_page', {
      currentPage: pageName,
    });
    await analytics().setCurrentScreen(pageName, pageName);
  }
}
