import * as React from 'react';
import BaseContainer from '../base-container';
import {AccountRoutePath} from '../../routes/route.path';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-community/async-storage';
import ProfileState from '../../contexts/profile/state';
import ProfileContext from '../../contexts/profile/context';
import ProfileScreen from '../../screens/profile/profile-screen';
import {Alert} from 'react-native';
import t from '../../utils/i18n';

export interface Props {}

export default class ProfileContainer extends BaseContainer<
  Props,
  ProfileState
> {
  constructor(props: any) {
    super(props);
    this.logOut = this.logOut.bind(this);
    this.state = {
      isNotificationsEnabled: true,
      actions: {
        logOut: this.logOut,
      },
    };
  }

  logOut() {
    Alert.alert(
      t('HoneyApp'),
      t('Are you sure to log out?'),
      [
        {
          text: t('Cancel'),
          style: 'cancel',
        },
        {
          text: t('Log out'),
          style: 'destructive',
          onPress: async () => {
            if (auth().currentUser) {
              await auth().signOut();
            }
            await AsyncStorage.removeItem('isLoggedUser');
            this.navigateWithoutHistory(AccountRoutePath);
          },
        },
      ],
      {
        cancelable: false,
      },
    );
  }

  render() {
    return (
      <ProfileContext.Provider value={this.state}>
        <ProfileScreen />
      </ProfileContext.Provider>
    );
  }
}
