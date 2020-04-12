import * as React from 'react';
import BaseContainer from '../../base-container';
import {AccountRoutePath} from '../../../routes/route.path';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-community/async-storage';
import ProfileState from '../../../contexts/profile/state';
import ProfileContext from '../../../contexts/profile/context';
import ProfileScreen from '../../../screens/tab/profile/profile.screen';
import {Alert, Linking} from 'react-native';
import t from '../../../utils/i18n';

export interface Props {}

export default class ProfileContainer extends BaseContainer<
  Props,
  ProfileState
> {
  constructor(props: any) {
    super(props);
    const state = new ProfileState();
    state.actions.goToSocial = this.goToSocial.bind(this);
    state.actions.logOut = this.logOut.bind(this);
    state.actions.goToPrivacy = this.goToPrivacy.bind(this);
    state.actions.goToContactUs = this.goToContactUs.bind(this);
    state.actions.goToBlog = this.goToBlog.bind(this);
    state.actions.goToAboutUs = this.goToAboutUs.bind(this);
    this.state = state;
  }

  async componentDidMount() {
    const isNotificationEnabled =
      (await AsyncStorage.getItem('isNotificationEnabled')) || true;
    this.setState({
      isNotificationsEnabled: isNotificationEnabled === 'true',
    });
  }

  async goToSocial(type: string) {
    let url = '';
    switch (type) {
      case 'facebook':
        url = 'https://www.facebook.com/letshoneybox';
        break;
      case 'twitter':
        url = 'https://twitter.com/letshoneybox';
        break;
      case 'instagram':
        url = 'https://www.instagram.com/letshoneybox/';
        break;
      default:
        url = 'https://www.letshoneybox.com';
        break;
    }
    await Linking.openURL(url);
  }

  async goToBlog() {
    await Linking.openURL('https://www.letshoneybox.com/blog');
  }
  async goToAboutUs() {
    await Linking.openURL('https://www.letshoneybox.com/');
  }
  async goToContactUs() {
    await Linking.openURL('https://www.letshoneybox.com/');
  }
  async goToPrivacy() {
    await Linking.openURL('https://www.letshoneybox.com/soezlesmeler');
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
