import 'react-native-gesture-handler';
import * as React from 'react';
import Route from './route';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {ThemeProvider} from 'styled-components';
import theme from './themes';
import {enableScreens} from 'react-native-screens';
import {SafeAreaView, View} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import SplashScreen from 'react-native-splash-screen';

enableScreens();

export interface Props {}

export interface State {
  isLoading: boolean;
  isLogged: boolean;
}

export default class App extends React.Component<Props, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      isLoading: true,
      isLogged: false,
    };
  }

  async componentDidMount() {
    const isLoggedUser = await AsyncStorage.getItem('isLoggedUser');
    const isLogged = (isLoggedUser && isLoggedUser === 'true') || false;
    this.setState({
      isLoading: false,
      isLogged: isLogged,
    });
  }

  render() {
    if (this.state.isLoading) {
      return <View />;
    }

    SplashScreen.hide();

    return (
      <ThemeProvider theme={theme}>
        <SafeAreaProvider>
          <Route isLogged={this.state.isLogged} />
        </SafeAreaProvider>
      </ThemeProvider>
    );
  }
}
