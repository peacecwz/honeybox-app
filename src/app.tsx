import 'react-native-gesture-handler';
import * as React from 'react';
import Route from './routes';
import {enableScreens} from 'react-native-screens';
import {View} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import SplashScreen from 'react-native-splash-screen';
import {firebase} from '@react-native-firebase/auth';
import {ApplicationProvider, IconRegistry} from '@ui-kitten/components';
import {mapping} from '@eva-design/eva';
import {getTheme} from './themes';
import AppContext from './contexts/app/context';
import AppState from './contexts/app/state';
import {EvaIconsPack} from '@ui-kitten/eva-icons';

enableScreens();

export interface Props {}

export interface State {
  isLoading: boolean;
  isLogged: boolean;
}

export default class App extends React.Component<Props, AppState> {
  constructor(props: any) {
    super(props);
    this.state = new AppState();
  }

  async componentDidMount() {
    if (__DEV__) {
      firebase.database().setLoggingEnabled(true);
    }

    const isLoggedUser = await AsyncStorage.getItem('isLoggedUser');
    const theme = (await AsyncStorage.getItem('theme')) || '';
    const isLogged = (isLoggedUser && isLoggedUser === 'true') || false;
    this.setState({
      isLoading: false,
      isLogged: isLogged,
      theme: theme,
    });
  }

  render() {
    if (this.state.isLoading) {
      return <View />;
    }

    SplashScreen.hide();

    return (
      <AppContext.Provider value={this.state}>
        <AppContext.Consumer>
          {state => (
            <ApplicationProvider
              mapping={mapping}
              theme={getTheme(state.theme)}>
              <IconRegistry icons={EvaIconsPack} />
              <Route isLogged={state.isLogged} />
            </ApplicationProvider>
          )}
        </AppContext.Consumer>
      </AppContext.Provider>
    );
  }
}
