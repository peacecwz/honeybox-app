import * as React from 'react';
import BaseContainer from '../../base-container';
import {AccountRoutePath} from '../../../routes/route.path';
import HomeScreen from '../../../screens/tab/home/home.screen';
import HomeContext from '../../../contexts/home/context';
import HomeState from '../../../contexts/home/state';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-community/async-storage';
export interface Props {}

export default class HomeContainer extends BaseContainer<Props, HomeState> {
  constructor(props: any) {
    super(props);
    this.logOut = this.logOut.bind(this);
    this.state = {
      actions: {
        logOut: this.logOut,
      },
    };
  }

  async logOut() {
    if (auth().currentUser) {
      await auth().signOut();
    }
    await AsyncStorage.removeItem('isLoggedUser');
    this.push(AccountRoutePath);
  }

  render() {
    return (
      <HomeContext.Provider value={this.state}>
        <HomeScreen />
      </HomeContext.Provider>
    );
  }
}
