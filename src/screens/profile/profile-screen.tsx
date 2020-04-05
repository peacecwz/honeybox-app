import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {Setting} from '../../components/settings-section.component';
import {Layout, Toggle} from '@ui-kitten/components';
import t from '../../utils/i18n';
import ProfileContext from '../../contexts/profile/context';

export default class ProfileScreen extends React.Component {
  render() {
    return (
      <ProfileContext.Consumer>
        {state => (
          <Layout style={styles.container}>
            <Setting
              style={[styles.setting, styles.section]}
              hint={t('Blog')}
            />
            <Setting style={styles.setting} hint={t('Privacy Policy')} />
            <Setting style={styles.setting} hint={t('About Us')} />
            <Setting style={styles.setting} hint={t('Contact Us')} />
            <Setting
              style={styles.setting}
              hint={t('Enable Notifications')}
              onPress={() => {}}>
              <Toggle onChange={() => {}} />
            </Setting>
            <Setting
              style={[styles.setting, styles.section]}
              onPress={() => state.actions.logOut()}
              hint={t('Log out')}
            />
          </Layout>
        )}
      </ProfileContext.Consumer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  setting: {
    padding: 16,
  },
  section: {
    paddingTop: 32,
  },
});
