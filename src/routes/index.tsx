import 'react-native-gesture-handler';
import * as React from 'react';
import {
  AccountRoutePath,
  ChallengeDetailRoutePath,
  MainRoutePath,
} from './route.path';
import t from '../utils/i18n';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import AccountRoute from './account.route';
import TabRoute from './tab.route';
import {NavigationState} from '@react-navigation/routers';
import analytics from '@react-native-firebase/analytics';
import {TopNavigation, TopNavigationAction} from '@ui-kitten/components';
import {ArrowIosBackIcon} from '../components/icons';
import {SafeAreaView} from 'react-native';
import ChallengeDetailContainer from '../containers/challenges/challenge-detail.container';

const MainStack = createStackNavigator();

export interface Props {
  isLogged: boolean;
}

export interface State {
  canShowTopBar: boolean;
}

export default class Index extends React.Component<Props, State> {
  constructor(props: any) {
    super(props);
    this.onStateChange = this.onStateChange.bind(this);
    this.state = {
      canShowTopBar: false,
    };
  }

  async onStateChange(state: NavigationState | undefined) {
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

    const canShowTopBar = pageName.indexOf('main') > -1;

    this.setState({
      canShowTopBar: canShowTopBar,
    });

    await analytics().logEvent('current_page', {
      currentPage: pageName,
    });
    await analytics().setCurrentScreen(pageName, pageName);
  }

  getRouteName() {
    return this.props.isLogged ? MainRoutePath : AccountRoutePath;
  }

  renderHeader(scene: any, previous: any, navigation: any) {
    const {options} = scene.descriptor;
    const title =
      options.headerTitle !== undefined
        ? options.headerTitle
        : options.title !== undefined
        ? options.title
        : scene.route.name;

    if (!this.state.canShowTopBar) {
      return null;
    }

    return (
      <SafeAreaView style={{flex: 1}}>
        <TopNavigation
          title={title}
          leftControl={
            previous ? (
              <TopNavigationAction
                icon={ArrowIosBackIcon}
                onPress={navigation.goBack}
              />
            ) : (
              undefined
            )
          }
          style={options.headerStyle}
        />
      </SafeAreaView>
    );
  }

  render() {
    return (
      <SafeAreaView style={{flex: 1}}>
        <NavigationContainer onStateChange={this.onStateChange}>
          <MainStack.Navigator
            initialRouteName={this.getRouteName()}>
            <MainStack.Screen
              name={MainRoutePath}
              options={{
                title: t('HoneyApp'),
              }}
              component={TabRoute}
            />
            <MainStack.Screen
              name={AccountRoutePath}
              options={{
                title: t('Login'),
              }}
              component={AccountRoute}
            />
            <MainStack.Screen
              name={ChallengeDetailRoutePath}
              options={{
                title: t('Challenge Detail'),
              }}
              component={ChallengeDetailContainer}
            />
          </MainStack.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    );
  }
}
